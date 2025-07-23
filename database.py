from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

# 환경 변수에서 DATABASE_URL 읽기
databaseUrl = os.getenv("DATABASE_URL")

# 예외 처리
if not databaseUrl:
    raise ValueError("❌ DATABASE_URL이 .env에서 불러와지지 않았습니다.")

engine = create_engine(databaseUrl)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
