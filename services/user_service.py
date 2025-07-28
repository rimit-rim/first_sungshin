from models.user import User
from sqlalchemy.orm import Session
from fastapi import HTTPException

def get_or_create_user(db: Session, user_info: dict):
    email = user_info["email"]
    nickname = user_info.get("name")
    provider_id = user_info.get("id")

    user = db.query(User).filter_by(email=email, providerId=provider_id).first()
    if not user:
        user = User(
            email=email,
            nickname=nickname,
            providerId=provider_id,
            verification=0  # 기본값
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

def get_my_page(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    return user