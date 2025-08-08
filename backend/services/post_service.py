from sqlalchemy.orm import Session
from sqlalchemy import func
from models.post import Post
from models.board import Board
from models.comment import Comment
from schemas.post import PostCreate, PostUpdate
from fastapi import HTTPException


# 프론트엔드 slug → DB slug 매핑
def get_db_slug(frontend_slug: str) -> str:
    """프론트엔드에서 사용하는 slug를 DB slug로 변환"""
    slug_mapping = {
        "free": "free",
        "career": "career",
        "qna": "qna",
        "promo": "promo"
    }
    return slug_mapping.get(frontend_slug, frontend_slug)


# 게시판 slug 기준 게시글 목록 조회 - 댓글 수 포함
def get_posts_by_board_slug(db: Session, board_slug: str):
    # 프론트엔드 slug를 DB slug로 변환
    db_slug = get_db_slug(board_slug)
    board = db.query(Board).filter(Board.slug == db_slug).first()
    if not board:
        raise HTTPException(status_code=404, detail="게시판 정보를 찾을 수 없습니다.")

    # 🔧 게시글과 댓글 수를 함께 조회
    posts_with_comment_count = (
        db.query(
            Post,
            func.count(Comment.id).label('comment_count')
        )
        .outerjoin(Comment, Post.id == Comment.postId)  # LEFT JOIN으로 댓글이 없는 게시글도 포함
        .filter(Post.boardId == board.id)
        .group_by(Post.id)
        .order_by(Post.createdAt.desc())
        .all()
    )

    # 결과를 Post 객체 리스트로 변환하면서 commentCount 속성 추가
    result = []
    for post, comment_count in posts_with_comment_count:
        # 동적으로 commentCount 속성 추가
        post.commentCount = comment_count
        result.append(post)

    return result


# 게시글 생성
def create_post(db: Session, board_slug: str, user_id: int, post_data: PostCreate):
    # 프론트엔드 slug를 DB slug로 변환
    db_slug = get_db_slug(board_slug)

    board = db.query(Board).filter(Board.slug == db_slug).first()
    if not board:
        raise HTTPException(status_code=404, detail="게시판 정보를 찾을 수 없습니다.")

    new_post = Post(
        title=post_data.title,
        content=post_data.content,
        userId=user_id,
        boardId=board.id,
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    # 새 게시글은 댓글이 0개
    new_post.commentCount = 0
    return new_post


# 게시글 상세 조회 - 댓글 수 포함
def get_post_by_id(db: Session, post_id: int):
    # 게시글과 댓글 수를 함께 조회
    post_with_comment_count = (
        db.query(
            Post,
            func.count(Comment.id).label('comment_count')
        )
        .outerjoin(Comment, Post.id == Comment.postId)
        .filter(Post.id == post_id)
        .group_by(Post.id)
        .first()
    )

    if not post_with_comment_count:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    post, comment_count = post_with_comment_count
    post.commentCount = comment_count
    return post


# 게시글 수정
def update_post(db: Session, post_id: int, post_data: PostUpdate):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")

    if post_data.title is not None:
        post.title = post_data.title
    if post_data.content is not None:
        post.content = post_data.content

    db.commit()
    db.refresh(post)

    # 댓글 수도 함께 조회
    comment_count = db.query(func.count(Comment.id)).filter(Comment.postId == post.id).scalar() or 0
    post.commentCount = comment_count
    return post


# 게시글 삭제
def delete_post(db: Session, post_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    db.delete(post)
    db.commit()
    return {"message": "게시글이 삭제되었습니다."}