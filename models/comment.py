from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, index=True)
    comment = Column(String, nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    userId = Column(Integer, ForeignKey("user.id"), nullable=False)
    postId = Column(Integer, ForeignKey("post.id"), nullable=False)
