from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from fastapi import Depends


# .env 파일 로드
load_dotenv()

# 환경변수에서 DATABASE_URL 불러오기
DATABASE_URL = os.getenv("DATABASE_URL")

# DB 연결 설정
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 모델들이 상속받을 기본 Base 클래스
Base = declarative_base()

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()