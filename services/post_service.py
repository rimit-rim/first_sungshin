from sqlalchemy.orm import Session
from models.post import Post
from models.board import Board
from schemas.post import PostCreate, PostUpdate
from fastapi import HTTPException


# 게시판 slug 기준 게시글 목록 조회
def get_posts_by_board_slug(db: Session, board_slug: str):
    board = db.query(Board).filter(Board.slug == board_slug).first()
    if not board:
        raise HTTPException(status_code=404, detail="게시판 정보를 찾을 수 없습니다.")
    return db.query(Post).filter(Post.boardId == board.id).order_by(Post.createdAt.desc()).all()


# 게시글 생성
def create_post(db: Session, board_slug: str, user_id: int, post_data: PostCreate):
    board = db.query(Board).filter(Board.slug == board_slug).first()
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
    return new_post


# 게시글 상세 조회
def get_post_by_id(db: Session, post_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
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
    return post


# 게시글 삭제
def delete_post(db: Session, post_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")

    db.delete(post)
    db.commit()
    return {"message": "게시글이 삭제되었습니다."}
