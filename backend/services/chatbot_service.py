import os
import re
from pathlib import Path
from typing import Dict
from dotenv import load_dotenv

from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables import RunnableLambda

load_dotenv()
API_KEY = os.getenv("OPENAI_API_KEY", "")

BASE_DIR = Path(__file__).resolve().parents[1]  # backend/
DATA_DIR = BASE_DIR / "data"
VEC_DIR = DATA_DIR / "vector"
FAISS_KO_DIR = VEC_DIR / "faiss_kor"
FAISS_EN_DIR = VEC_DIR / "faiss_eng"

_loaded = False
chain_with_history_ko = None
chain_with_history_en = None
_session_histories: Dict[str, InMemoryChatMessageHistory] = {}
_session_lang: Dict[str, str] = {}

def _get_history(session_id: str) -> InMemoryChatMessageHistory:
    if session_id not in _session_histories:
        _session_histories[session_id] = InMemoryChatMessageHistory()
    return _session_histories[session_id]

def _detect_lang(text: str, default_lang="en", last_lang=None) -> str:
    if re.search(r"[ㄱ-ㅎ가-힣]", text):
        return "ko"
    if re.search(r"[A-Za-z]", text):
        return "en"
    if len(text.strip()) < 4 and last_lang:
        return last_lang
    try:
        from langdetect import detect as ld_detect
        return "ko" if ld_detect(text) == "ko" else "en"
    except Exception:
        return default_lang

def _build_chains():
    global chain_with_history_ko, chain_with_history_en, _loaded

    embedding_model = OpenAIEmbeddings(model="text-embedding-3-small", api_key=API_KEY)
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, api_key=API_KEY)

    vs_ko = FAISS.load_local(str(FAISS_KO_DIR), embedding_model, allow_dangerous_deserialization=True)
    vs_en = FAISS.load_local(str(FAISS_EN_DIR), embedding_model, allow_dangerous_deserialization=True)

    base_ret_ko = vs_ko.as_retriever(search_type="mmr", search_kwargs={"k": 6, "fetch_k": 20})
    base_ret_en = vs_en.as_retriever(search_type="mmr", search_kwargs={"k": 6, "fetch_k": 20})

    rewrite_prompt = ChatPromptTemplate.from_messages([
        ("system",
         "Rewrite a concise, standalone search query in the same language as {answer_language}, "
         "using the chat history and the latest user input. "
         "If the question is about schedules/dates/months, include 'Sungshin calendar' and the month/date."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}")
    ])

    answer_prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You assist international exchange students using ONLY the provided context.\n"
         "Always answer in {answer_language}.\n"
         "If the answer is not in the context, say you don’t know.\n\n"
         "When the question is about dates/schedules, use only items from 'Sungshin calendar' "
         "and ignore other sections.\n\n"
         "Context:\n{context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}")
    ])

    retriever_ko = create_history_aware_retriever(llm=llm, retriever=base_ret_ko, prompt=rewrite_prompt)
    retriever_en = create_history_aware_retriever(llm=llm, retriever=base_ret_en, prompt=rewrite_prompt)

    combine_docs_chain = create_stuff_documents_chain(llm=llm, prompt=answer_prompt)
    qa_chain_ko = create_retrieval_chain(retriever=retriever_ko, combine_docs_chain=combine_docs_chain)
    qa_chain_en = create_retrieval_chain(retriever=retriever_en, combine_docs_chain=combine_docs_chain)

    qa_chain_ko_wrapped = RunnableLambda(lambda x: qa_chain_ko.invoke(x)["answer"])
    qa_chain_en_wrapped = RunnableLambda(lambda x: qa_chain_en.invoke(x)["answer"])

    chain_with_history_ko = RunnableWithMessageHistory(
        qa_chain_ko_wrapped,
        lambda sid: _get_history(sid),
        input_messages_key="input",
        history_messages_key="chat_history"
    )
    chain_with_history_en = RunnableWithMessageHistory(
        qa_chain_en_wrapped,
        lambda sid: _get_history(sid),
        input_messages_key="input",
        history_messages_key="chat_history"
    )

    _loaded = True

def ensure_loaded():
    if not _loaded:
        _build_chains()

def _pick_chain(session_id: str, question: str):
    last_lang = _session_lang.get(session_id)
    lang = _detect_lang(question, last_lang=last_lang)
    _session_lang[session_id] = lang
    chain = chain_with_history_ko if lang == "ko" else chain_with_history_en
    answer_language = "Korean" if lang == "ko" else "English"
    return chain, answer_language

def get_calendar_response(question: str, session_id: str = "user1") -> str:
    ensure_loaded()
    chain, answer_lang = _pick_chain(session_id, question)
    answer = chain.invoke(
        {"input": question, "answer_language": answer_lang},
        config={"configurable": {"session_id": session_id}}
    )
    return answer
