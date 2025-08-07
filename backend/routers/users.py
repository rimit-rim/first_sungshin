from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from deps.db import get_db
from services.user_service import get_my_page
from core.security import get_current_user
from schemas.user import UserResponseSchema
from models.user import User

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

@router.get("/me", response_model=UserResponseSchema)
def read_my_page(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_my_page(db, current_user.id)
