from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(10), nullable=False)
    email = Column(String(40), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    verification = Column(Integer, nullable=False, default=0)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
