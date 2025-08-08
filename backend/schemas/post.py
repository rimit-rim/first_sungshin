from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# 게시글 생성 요청용
class PostCreate(BaseModel):
    title: str
    content: str

# 게시글 수정 요청용
class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

# 게시글 응답용
class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    commentCount: int = 0
    image: Optional[str]
    createdAt: datetime
    updatedAt: Optional[datetime]
    userId: int
    boardId: int

    class Config:
        from_attributes = True  # Pydantic v2 기준
