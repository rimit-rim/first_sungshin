from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from deps.db import get_db
from models.user import User
import os

bearer_scheme = HTTPBearer()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # ✨ 디버깅 로그 추가
        print("🔐 토큰:", token)
        print("📦 디코딩된 payload:", payload)

        user_id: int = int(payload.get("sub"))
        print("👤 user_id:", user_id)  # ✨ 추가

        if user_id is None:
            raise credentials_exception
    except JWTError as e:
        print("❌ JWT 디코딩 실패:", e)  # ✨ 추가
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    print("🧑‍💻 user 존재 여부:", bool(user))  # ✨ 추가

    if user is None:
        raise credentials_exception
    return user