from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.post import PostCreate, PostUpdate, PostResponse
from services import post_service

router = APIRouter(
    prefix="/api/community",
    tags=["Post"]
)

# 게시판별 게시글 목록 조회
@router.get("/{boardSlug}/posts", response_model=list[PostResponse])
def get_posts_by_board(boardSlug: str, db: Session = Depends(get_db)):
    
    return post_service.get_posts_by_board_slug(db, boardSlug)


# 게시글 상세 조회
@router.get("/posts/{postId}", response_model=PostResponse)
def get_post(postId: int, db: Session = Depends(get_db)):
    
    return post_service.get_post_by_id(db, postId)


# 게시글 생성
@router.post("/{boardSlug}/posts", response_model=PostResponse)
def create_post(boardSlug: str, post_data: PostCreate, db: Session = Depends(get_db)):
   
    dummy_user_id = 1  # TODO: 인증 기능 연동 시 대체
    return post_service.create_post(db, boardSlug, dummy_user_id, post_data)


# 게시글 수정
@router.patch("/posts/{postId}", response_model=PostResponse)
def update_post(postId: int, post_data: PostUpdate, db: Session = Depends(get_db)):
   
    return post_service.update_post(db, postId, post_data)


# 게시글 삭제
@router.delete("/posts/{postId}")
def delete_post(postId: int, db: Session = Depends(get_db)):
    
    post_service.delete_post(db, postId)
    return {"message": "게시글이 삭제되었습니다."}
