from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx
import os

from core.security import create_access_token
from deps.db import get_db
from services import user_service

router = APIRouter(prefix="/api/auth", tags=["Auth"])

GOOGLE_AUTH_URI = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URI = "https://www.googleapis.com/oauth2/v2/userinfo"

# 구글 로그인 진입점
@router.get("/google/login")
def google_login():
    redirect_uri = GOOGLE_AUTH_URI + "?" + "&".join([
        f"client_id={os.getenv('GOOGLE_CLIENT_ID')}",
        f"redirect_uri={os.getenv('GOOGLE_REDIRECT_URI')}",
        "response_type=code",
        "scope=openid email profile",
        "access_type=offline",
        "prompt=consent"
    ])
    return RedirectResponse(redirect_uri)

# 구글 콜백 - 토큰 수신 + 유저 정보 조회 + JWT 발급
@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    code = request.query_params.get("code")

    if not code:
        return {"error": "Authorization code not provided"}

    async with httpx.AsyncClient() as client:
        # 1. 구글 access_token 요청
        token_resp = await client.post(GOOGLE_TOKEN_URI, data={
            'code': code,
            'client_id': os.getenv('GOOGLE_CLIENT_ID'),
            'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
            'redirect_uri': os.getenv('GOOGLE_REDIRECT_URI'),
            'grant_type': 'authorization_code',
        })
        token_data = token_resp.json()
        access_token = token_data.get("access_token")

        if not access_token:
            return {"error": "Failed to get access token"}

        # 2. 유저 정보 요청
        user_resp = await client.get(GOOGLE_USERINFO_URI, headers={
            'Authorization': f'Bearer {access_token}'
        })
        user_info = user_resp.json()

    # 3. 유저 생성 or 조회
    user = user_service.get_or_create_user(db, user_info)

    # 4. JWT 발급
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
