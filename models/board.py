from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), nullable=False)
    isPublic = Column(Boolean, nullable=False, default=False)  # 열람 허용 여부
    writePost = Column(Integer, nullable=False, default=0)  # 0: 인증 사용자, 1: 관리자
