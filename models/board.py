from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), nullable=False)
    accessLevel = Column(Integer, nullable=False, default=0)  # 0: 일반 가입자, 1: 인증된 가입자, 2: 관리자
    slug = Column(String(30), nullable=False, unique=True)  # 게시판 이름

    # 관계 설정
    posts = relationship("Post", back_populates="board")