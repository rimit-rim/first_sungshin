# 🔮 first_sungshin
**어서와, 성신은 처음이지?** BE 레포지토리


## 📦 백엔드 초기 세팅 공유 (FastAPI + PostgreSQL + SQLAlchemy)


### ✅ 기본 스택
- FastAPI (비동기 웹 프레임워크)
- PostgreSQL (RDB)
- SQLAlchemy (ORM)
- Pydantic (데이터 검증 및 직렬화)


---

## 📁 프로젝트 구조

```
first_sungshin/
├── main.py # FastAPI 앱 진입점
├── database.py # DB 연결 및 세션 관리
├── models/ # SQLAlchemy 모델 정의 (User, Post, Board 등)
│ ├── user.py
│ ├── post.py
│ ├── board.py
│ └── comment.py
├── schemas/ # Pydantic 스키마 (입력/출력 DTO)
│ ├── user.py
│ ├── post.py
│ ├── board.py
│ └── comment.py
├── services/ # 비즈니스 로직 (DB 처리 및 내부 동작)
│ ├── user_service.py
│ ├── post_service.py
│ ├── board_service.py
│ └── comment_service.py
├── routers/ # FastAPI 라우터 정의 (엔드포인트)
│ ├── auth.py
│ ├── users.py
│ ├── posts.py
│ ├── boards.py
│ └── comments.py
├── deps/ # Depends용 공통 의존성 처리
│ └── auth.py # 권한 확인, get_current_user 등
├── core/ # 설정, 보안, 유틸
│ ├── config.py # 환경변수 로딩
│ └── security.py # JWT, 암호화 관련 함수
├── .env # 환경변수 파일 (DB URL, 시크릿 키 등)
├── requirements.txt # 의존성 목록
└── README.md
```


---

## ✅ 실행 방법

1. `.env` 파일 만들기 (루트 디렉토리에)

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/yourdb
```

2. 서버 실행

```bash
uvicorn app.main:app --reload
```

3. API 문서 확인

[http://localhost:8000/docs](http://localhost:8000/docs)

---

## ✅ 규칙 요약 (작성 컨벤션)

- 변수명: 카멜케이스 (`createdAt`, `userId`)
- 클래스: 대문자로 시작
- 의미 없는 한 글자 변수 지양
- 패키지명은 소문자

---

## 📌 참고

- ORM: SQLAlchemy 사용
- DB: PostgreSQL
- API 서버: FastAPI
- 인증 방식: JWT