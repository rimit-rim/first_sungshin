# 🔮 Welcome To Sungshin Backend

## 📌 프로젝트 소개
외국인 학생들을 위한 커뮤니티 서비스 백엔드.  
FastAPI 기반으로 인증, 게시글/댓글 API, AI 챗봇을 제공합니다.

---

## 🧑‍🤝‍🧑 팀 소개
이수빈 : 게시글 API

염수림 : 구글 로그인, 댓글 API

윤지원 : AI 챗봇

---

## 🛠️ 기술 스택
- **Framework** : FastAPI
- **Database** : PostgreSQL, SQLAlchemy (ORM)
- **Validation** : Pydantic
- **Auth** : JWT, Google OAuth2
- **AI/ML** : LangChain, OpenAI API
- **ETC** : dotenv(.env), ERD 설계

---

## 📂 프로젝트 구조
```bash
backend/
├── main.py               # FastAPI 앱 진입점
├── database.py           # DB 연결 및 세션 관리
├── models/               # SQLAlchemy 모델 정의
│   ├── user.py
│   ├── post.py
│   ├── board.py
│   └── comment.py
├── schemas/              # Pydantic 스키마 (입출력 DTO)
│   ├── user.py
│   ├── post.py
│   ├── board.py
│   └── comment.py
├── services/             # 비즈니스 로직
│   ├── user_service.py
│   ├── post_service.py
│   ├── board_service.py
│   ├── comment_service.py
│   └── chatbot_service.py   # AI 챗봇
├── routers/              # FastAPI 라우터
│   ├── auth.py
│   ├── users.py
│   ├── posts.py
│   ├── boards.py
│   ├── comments.py
│   └── chatbot.py
├── deps/                 # Depends 공통 의존성
│   └── db.py
├── core/                 # 설정, 보안
│   ├── config.py
│   └── security.py
├── data/                 # CSV 파일 저장
├── tools/                # 벡터DB 빌드 스크립트
│   └── build_vector_db.py
├── .env                  # 환경변수
├── requirements.txt      # 의존성 목록
└── README.md
```

---

## 🗂️ ERD
<img width="1635" height="781" alt="WtoS ERD" src="https://github.com/user-attachments/assets/786540d2-6812-41c9-b61f-3cf730372eea" />

---
## 🌐 서버 아키텍처
<img width="1964" height="1042" alt="WtoS_tech_stack" src="https://github.com/user-attachments/assets/1bf2b694-8c06-45cc-be4c-c02f0bf8b65a" />
