from fastapi import FastAPI
from database import engine
from models import user, post, comment, board
from routers.posts import router as post_router
from routers.boards import router as boards_router
from routers import auth

app = FastAPI()

# 라우터 등록
app.include_router(boards_router)
app.include_router(post_router)
app.include_router(auth.router)

# DB 연결 처리
try:
    user.Base.metadata.create_all(bind=engine)
    post.Base.metadata.create_all(bind=engine)
    comment.Base.metadata.create_all(bind=engine)
    board.Base.metadata.create_all(bind=engine)
except Exception as e:
    print("⚠️ DB 연결 실패 (개발 중, 무시 가능):", e)
