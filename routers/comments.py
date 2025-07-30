from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from deps.db import get_db
from schemas.comment import CommentCreate, CommentUpdate, CommentResponse
from services import comment_service as commentService
from core.security import get_current_user
from models.user import User
from typing import List

router = APIRouter(prefix="", tags=["Comment"])

@router.get("/api/community/posts/{postId}/comments", response_model=List[CommentResponse])
def getComments(postId: int, db: Session = Depends(get_db)):
    return commentService.getCommentsByPost(db, postId)

@router.post("/api/community/posts/{postId}/comments", response_model=CommentResponse)
def createComment(postId: int, commentData: CommentCreate,
                  db: Session = Depends(get_db),
                  currentUser: User = Depends(get_current_user)):
    return commentService.createComment(db, postId, currentUser.id, commentData)

@router.put("/api/community/comments/{commentId}", response_model=CommentResponse)
def updateComment(commentId: int, commentData: CommentUpdate,
                  db: Session = Depends(get_db),
                  currentUser: User = Depends(get_current_user)):
    return commentService.updateComment(db, commentId, currentUser.id, commentData)

@router.delete("/api/community/comments/{commentId}", status_code=status.HTTP_204_NO_CONTENT)
def deleteComment(commentId: int,
                  db: Session = Depends(get_db),
                  currentUser: User = Depends(get_current_user)):
    commentService.deleteComment(db, commentId, currentUser.id)
