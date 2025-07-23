from models.user import User
from sqlalchemy.orm import Session

def get_or_create_user(db: Session, user_info: dict):
    email = user_info["email"]
    nickname = user_info.get("name")
    provider_id = user_info.get("id")

    user = db.query(User).filter_by(email=email).first()
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
