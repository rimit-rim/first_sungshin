from pydantic import BaseModel

# 게시판 응답용 스키마
class BoardResponse(BaseModel):
    id: int
    name: str
    slug: str
    accessLevel: int

    class Config:
        from_attributes = True  # orm_mode의 v2 버전
