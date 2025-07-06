from fastapi import FastAPI
from database import engine
from models import user, post, comment

app = FastAPI()

user.Base.metadata.create_all(bind=engine)
post.Base.metadata.create_all(bind=engine)
comment.Base.metadata.create_all(bind=engine)
