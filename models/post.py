from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    image = Column(String, nullable=True)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), nullable=True)

    userId = Column(Integer, ForeignKey("user.id"), nullable=False)
    boardId = Column(Integer, ForeignKey("board.id"), nullable=False)

    # 관계 설정
    user = relationship("User", back_populates="posts")
    board = relationship("Board", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
