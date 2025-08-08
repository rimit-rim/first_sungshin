from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.post import PostCreate, PostUpdate, PostResponse
from services import post_service
from core.security import get_current_user

router = APIRouter(
    prefix="/api/community",
    tags=["Post"]
)


# 게시판별 게시글 목록 조회 - 인증 필수
@router.get("/{boardSlug}", response_model=list[PostResponse])
def get_posts_by_board(
        boardSlug: str,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):
    """게시판별 게시글 목록 조회"""
    return post_service.get_posts_by_board_slug(db, boardSlug)


# 게시글 생성 - 인증 필수
@router.post("/{boardSlug}", response_model=PostResponse)
async def create_post(
        boardSlug: str,
        post_data: PostCreate,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):
    """게시글 생성"""
    return post_service.create_post(db, boardSlug, current_user.id, post_data)


# 게시글 상세 조회 - 인증 필수
@router.get("/post/{postId}", response_model=PostResponse)
def get_post(
        postId: int,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):
    """게시글 상세 조회"""
    print(f"🔍 Getting post with ID: {postId}")
    print(f"👤 Current user: {current_user.id}")
    try:
        post = post_service.get_post_by_id(db, postId)
        print(f"✅ Post found: {post.title}")
        return post
    except HTTPException as e:
        print(f"❌ Post not found: {e.detail}")
        raise e
    except Exception as e:
        print(f"💥 Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# 게시글 수정 - 작성자만 가능
@router.patch("/post/{postId}", response_model=PostResponse)
def update_post(
        postId: int,
        post_data: PostUpdate,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):
    """게시글 수정"""
    post = post_service.get_post_by_id(db, postId)
    if post.userId != current_user.id:
        raise HTTPException(status_code=403, detail="게시글 수정 권한이 없습니다.")

    return post_service.update_post(db, postId, post_data)


# 게시글 삭제 - 작성자만 가능
@router.delete("/post/{postId}")
def delete_post(
        postId: int,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):
    """게시글 삭제"""
    post = post_service.get_post_by_id(db, postId)
    if post.userId != current_user.id:
        raise HTTPException(status_code=403, detail="게시글 삭제 권한이 없습니다.")

    post_service.delete_post(db, postId)
    return {"message": "게시글이 삭제되었습니다."}