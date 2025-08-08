from fastapi import APIRouter
from pydantic import BaseModel
from services.chatbot_service import get_calendar_response

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

router = APIRouter(prefix="", tags=["Chatbot"])
@router.post("/api/chat", response_model=ChatResponse)
def ask_chatbot(req: ChatRequest):
    result = get_calendar_response(req.question)
    return ChatResponse(answer=result)
