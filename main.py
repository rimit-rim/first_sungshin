from fastapi import FastAPI
from database import engine
from models import user, post, comment, board
from routers import auth, users, comments, chatbot
from routers.posts import router as post_router
from routers.boards import router as boards_router
from fastapi.openapi.utils import get_openapi

app = FastAPI()

# 라우터 등록
app.include_router(boards_router)
app.include_router(post_router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(comments.router)
app.include_router(chatbot.router)

# DB 테이블 생성
try:
    user.Base.metadata.create_all(bind=engine)
    post.Base.metadata.create_all(bind=engine)
    comment.Base.metadata.create_all(bind=engine)
    board.Base.metadata.create_all(bind=engine)
except Exception as e:
    print("⚠️ DB 연결 실패 (개발 중, 무시 가능):", e)

# Swagger 커스터 마이징
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Welcome to Sungshin API",
        version="1.0.0",
        description="국제학생들을 위한 학교 커뮤니티",
        routes=app.routes,
    )

    # 🔐 Bearer 인증 방식 등록
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    # 모든 API에 기본 적용
    for path in openapi_schema["paths"]:
        for method in openapi_schema["paths"][path]:
            openapi_schema["paths"][path][method]["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi