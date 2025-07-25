from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(30), nullable=False)
    email = Column(String(40), nullable=False, unique=True)
    verification = Column(Integer, nullable=False, default=0)   # 0: 일반 가입자, 1: 인증된 가입자, 2: 관리자
    providerId = Column(String(50), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())

    # 관계 설정
    posts = relationship("Post", back_populates="user")
    comments = relationship("Comment", back_populates="user")
