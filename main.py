from fastapi import FastAPI
from routers.posts import router as post_router
from routers.boards import router as boards_router


app = FastAPI()

# 라우터 등록 (프론트 연동용)
app.include_router(boards_router)
app.include_router(post_router)

# PostgreSQL 연결은 나중에: 아래는 일단 예외 처리
try:
    from database import engine
    from models import user, post, comment, board

    user.Base.metadata.create_all(bind=engine)
    post.Base.metadata.create_all(bind=engine)
    comment.Base.metadata.create_all(bind=engine)
    board.Base.metadata.create_all(bind=engine)

except Exception as e:
    print("⚠️ DB 연결 실패 (개발 중, 무시 가능):", e)
