from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from services.board_service import get_board_list
from schemas.board import BoardResponse

router = APIRouter(
    prefix="/api/community",
    tags=["Board"]
)

# 게시판 목록 조회
@router.get("", response_model=list[BoardResponse])
def read_board_list(db: Session = Depends(get_db)):
    
    boards = get_board_list(db)
    if not boards:
        raise HTTPException(status_code=404, detail="게시판 정보를 찾을 수 없습니다.")
    return boards
