# 🔮 first_sungshin
**어서와, 성신은 처음이지?** BE 레포지토리


# 📦 백엔드 초기 세팅 공유 (FastAPI + PostgreSQL + SQLAlchemy)

## ✅ 구성 파일

| 파일                  | 설명                       |
|---------------------|--------------------------|
| `database.py`       | PostgreSQL 연결 설정         |
| `models/user.py`    | User 모델                  |
| `models/post.py`    | Post 모델                  |
| `models/comment.py` | Comment 모델               |
| `models/board.py`   | Board 모델                 |
| `main.py`           | FastAPI 앱 + 테이블 생성 실행 파일 |

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
- 한글자 변수 지양
- 패키지명은 소문자

---

## 📌 참고

- ORM: SQLAlchemy 사용
- DB: PostgreSQL
- API 서버: FastAPI
