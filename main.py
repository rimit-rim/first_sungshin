from fastapi import FastAPI
from database import engine, Base
from models import user, post, comment, board

app = FastAPI()

Base.metadata.create_all(bind=engine)

