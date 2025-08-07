from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from deps.db import get_db
from schemas.comment import CommentCreate, CommentUpdate, CommentResponse
from services import comment_service as commentService
from core.security import get_current_user
from models.user import User
from typing import List

router = APIRouter(prefix="", tags=["Comment"])

# ✅ 경로 수정: posts → post
@router.get("/api/community/post/{postId}/comments", response_model=List[CommentResponse])
def getComments(postId: int, db: Session = Depends(get_db)):
    """게시글의 댓글 목록 조회"""
    print(f"🔍 Getting comments for post ID: {postId}")
    try:
        comments = commentService.getCommentsByPost(db, postId)
        print(f"✅ Found {len(comments)} comments")
        return comments
    except Exception as e:
        print(f"❌ Error getting comments: {e}")
        raise e

# ✅ 경로 수정: posts → post
@router.post("/api/community/post/{postId}/comments", response_model=CommentResponse)
def createComment(postId: int, commentData: CommentCreate,
                  db: Session = Depends(get_db),
                  currentUser: User = Depends(get_current_user)):
    """댓글 작성"""
    print(f"📝 Creating comment for post ID: {postId}")
    print(f"💬 Comment content: {commentData.comment}")
    try:
        comment = commentService.createComment(db, postId, currentUser.id, commentData)
        print(f"✅ Comment created with ID: {comment.id}")
        return comment
    except Exception as e:
        print(f"❌ Error creating comment: {e}")
        raise e

@router.put("/api/community/comments/{commentId}", response_model=CommentResponse)
def updateComment(commentId: int, commentData: CommentUpdate,
                  db: Session = Depends(get_db),
                  currentUser: User = Depends(get_current_user)):
    """댓글 수정"""
    return commentService.updateComment(db, commentId, currentUser.id, commentData)

@router.delete("/api/community/comments/{commentId}", status_code=status.HTTP_204_NO_CONTENT)
def deleteComment(commentId: int,
                  db: Session = Depends(get_db),
                  currentUser: User = Depends(get_current_user)):
    """댓글 삭제"""
    commentService.deleteComment(db, commentId, currentUser.id)