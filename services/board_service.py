from sqlalchemy.orm import Session
from models.board import Board

def get_board_list(db: Session):
    return db.query(Board).all()
