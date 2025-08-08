from sqlalchemy.orm import Session, joinedload
from models import comment as commentModel, post as postModel
from schemas import comment as commentSchema
from fastapi import HTTPException, status


def getCommentsByPost(db: Session, postId: int):
    post = db.query(postModel.Post).filter(postModel.Post.id == postId).first()
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")

    comments = (db.query(commentModel.Comment)
                .options(joinedload(commentModel.Comment.user))
                .filter(commentModel.Comment.postId == postId)
                .all())

    try:
        return [
            commentSchema.CommentResponse.model_validate(comment)
            for comment in comments
        ]
    except Exception:
        raise HTTPException(status_code=500, detail="댓글 변환 중 오류가 발생했습니다.")


def createComment(db: Session, postId: int, userId: int, commentData: commentSchema.CommentCreate):
    post = db.query(postModel.Post).filter(postModel.Post.id == postId).first()
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")

    try:
        dbComment = commentModel.Comment(
            comment=commentData.comment,
            postId=postId,
            userId=userId,
        )
        db.add(dbComment)
        db.commit()
        db.refresh(dbComment)

        dbComment = (db.query(commentModel.Comment)
                     .options(joinedload(commentModel.Comment.user))
                     .filter(commentModel.Comment.id == dbComment.id)
                     .first())

        return commentSchema.CommentResponse.model_validate(dbComment)

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"댓글 생성 중 오류가 발생했습니다: {str(e)}")


def updateComment(db: Session, commentId: int, userId: int, commentData: commentSchema.CommentUpdate):
    comment = db.query(commentModel.Comment).filter(commentModel.Comment.id == commentId).first()
    if not comment:
        raise HTTPException(status_code=404, detail="댓글을 찾을 수 없습니다.")
    if comment.userId != userId:
        raise HTTPException(status_code=403, detail="댓글을 수정 할 수 있는 권한이 없습니다.")

    comment.comment = commentData.comment
    db.commit()
    db.refresh(comment)
    return commentSchema.CommentResponse.model_validate(comment)


def deleteComment(db: Session, commentId: int, userId: int):
    comment = db.query(commentModel.Comment).filter(commentModel.Comment.id == commentId).first()
    if not comment:
        raise HTTPException(status_code=404, detail="댓글을 찾을 수 없습니다.")
    if comment.userId != userId:
        raise HTTPException(status_code=403, detail="댓글을 삭제 할 수 있는 권한이 없습니다.")

    db.delete(comment)
    db.commit()
