from pydantic import BaseModel, Field
from datetime import datetime

class CommentCreate(BaseModel):
    comment: str

class CommentUpdate(BaseModel):
    comment: str

class CommentUserResponse(BaseModel):
    id: int
    nickname: str

    class Config:
        from_attributes = True
        allow_population_by_field_name = True  # 아래 alias를 허용

class CommentResponse(BaseModel):
    id: int
    comment: str
    createdAt: datetime
    userId: int
    user: CommentUserResponse

    class Config:
        from_attributes = True
