from sqlalchemy.orm import Session
from database import SessionLocal
from fastapi import Depends

# DB 세션 주입 함수
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
