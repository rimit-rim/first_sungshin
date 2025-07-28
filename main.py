from fastapi import FastAPI
from database import engine, Base
from models import user, post, comment, board
from routers import auth, users
from fastapi.openapi.utils import get_openapi

app = FastAPI()

# 라우터 등록
app.include_router(auth.router)
app.include_router(users.router)

# DB 테이블 생성
Base.metadata.create_all(bind=engine)

# Swagger 커스터 마이징
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="First Sungshin API",
        version="1.0.0",
        description="Google Login 기반 마이페이지 API",
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

