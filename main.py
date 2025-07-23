from fastapi import FastAPI
from database import engine, Base
from models import user, post, comment, board
from routers import auth

app = FastAPI()

app.include_router(auth.router)

Base.metadata.create_all(bind=engine)

