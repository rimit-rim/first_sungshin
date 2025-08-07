import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables import RunnableLambda

PDF_PATH = "data/sungshin_info.pdf"

def get_calendar_response(question: str, session_id: str = "user1") -> str:
    api_key = os.getenv("OPENAI_API_KEY", "")

    # 1. PDF 로딩
    loader = PyPDFLoader(PDF_PATH)
    page_docs = loader.load()
    full_text = "\n\n".join([doc.page_content for doc in page_docs])

    # 2. 텍스트 나누기
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
    chunks = splitter.create_documents([full_text])

    # 3. 벡터스토어 생성
    vectorstore = FAISS.from_documents(
        documents=chunks,
        embedding=OpenAIEmbeddings(model="text-embedding-3-small", api_key=api_key)
    )

    # 4. LLM 체인 구성
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3, api_key=api_key)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "너는 친절하고 유능한 조교야."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        ("ai", "{context}")
    ])

    retriever = create_history_aware_retriever(llm, vectorstore.as_retriever(), prompt)
    combine_docs_chain = create_stuff_documents_chain(llm, prompt)
    qa_chain = create_retrieval_chain(retriever, combine_docs_chain)
    qa_chain_wrapped = RunnableLambda(lambda x: qa_chain.invoke(x)["answer"])

    # 5. 히스토리 기반 질문 응답
    chain_with_history = RunnableWithMessageHistory(
        qa_chain_wrapped,
        lambda session_id: InMemoryChatMessageHistory(),
        input_messages_key="input",
        history_messages_key="chat_history"
    )

    result = chain_with_history.invoke(
        {"input": question},
        config={"configurable": {"session_id": session_id}}
    )

    return result