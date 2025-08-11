from pathlib import Path
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
import os
import sys

# 경로/환경 설정
BASE_DIR = Path(__file__).resolve().parents[1]  # backend/
ENV_PATH = BASE_DIR / ".env"
load_dotenv(ENV_PATH)  # 루트 .env 로드

API_KEY = os.getenv("OPENAI_API_KEY", "")
if not API_KEY:
    print("OPENAI_API_KEY가 비어 있습니다. .env를 확인하세요:", ENV_PATH)
    sys.exit(1)

DATA_DIR = BASE_DIR / "data"
PDF_KO = DATA_DIR / "sungshin_info_kor.pdf"
PDF_EN = DATA_DIR / "sungshin_info_eng.pdf"
VEC_DIR = DATA_DIR / "vector"
VEC_DIR.mkdir(parents=True, exist_ok=True)

# 유틸
def to_chunks(page_docs, size=800, overlap=100):
    full_text = "\n\n".join([doc.page_content for doc in page_docs])
    splitter = RecursiveCharacterTextSplitter(chunk_size=size, chunk_overlap=overlap)
    return splitter.create_documents([full_text])

def build_one(pdf_path: Path, out_name: str):
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    print(f"📄 Loading: {pdf_path}")
    loader = PyPDFLoader(str(pdf_path))
    pages = loader.load()
    chunks = to_chunks(pages)

    print(f"🔧 Embedding & building FAISS ({out_name})...")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=API_KEY)
    vs = FAISS.from_documents(chunks, embeddings)

    out_dir = VEC_DIR / out_name
    vs.save_local(str(out_dir))
    print(f"✅ Saved: {out_dir}")

def main():
    print(f"🏁 BASE_DIR: {BASE_DIR}")
    print(f"📂 DATA_DIR: {DATA_DIR}")
    build_one(PDF_KO, "faiss_kor")
    build_one(PDF_EN, "faiss_eng")
    print("🎉 All vector DBs built successfully.")

if __name__ == "__main__":
    main()

## 코드 실행 : PDF 추가, 교체시만 실행
# python tools/build_vector_db.py