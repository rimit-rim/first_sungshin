import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI 서버 주소
  withCredentials: true,            // 인증이 필요한 경우
  timeout: 10000,                   // 10초 타임아웃
});

// 🔐 요청 인터셉터 - 모든 요청에 자동으로 JWT 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // ✅ headers 안전 초기화
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
      if (import.meta.env.DEV) {
        console.log('🔐 Token added to request:', token.substring(0, 12) + '…');
      }
    } else {
      if (import.meta.env.DEV) console.log('⚠️ No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 📥 응답 인터셉터 - 인증 에러 처리
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.response?.status);

    // 401 Unauthorized - 토큰이 만료되었거나 유효하지 않음
    if (error.response?.status === 401) {
      console.log('🚪 Unauthorized - redirecting to login');
      localStorage.removeItem('token');

      // 현재 페이지가 이미 루트가 아닌 경우만 리디렉트
      if (window.location.pathname !== '/') {
        window.location.href = '/?error=session_expired';
      }
    }

    // 403 Forbidden - 권한 없음
    if (error.response?.status === 403) {
      console.log('🚫 Forbidden - insufficient permissions');
    }

    return Promise.reject(error);
  }
);

export default api;