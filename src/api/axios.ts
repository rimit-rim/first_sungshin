// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI 서버 주소
  withCredentials: true,            // (인증이 필요한 경우)
});

export default api;