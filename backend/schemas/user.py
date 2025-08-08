from pydantic import BaseModel
from datetime import datetime

class UserResponseSchema(BaseModel):
    id: int
    email: str
    nickname: str
    verification: int
    createdAt: datetime

    class Config:
        orm_mode = True
        from_attributes = True