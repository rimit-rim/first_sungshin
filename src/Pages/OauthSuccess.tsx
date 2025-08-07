import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const error = params.get("error");

        // 에러 처리
        if (error) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate(`/?error=${error}`);
          return;
        }

        // 토큰 처리
        if (token) {
          // localStorage에 저장
          localStorage.setItem("token", token);

          // 짧은 지연 후 홈으로 이동
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate("/home");

        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate("/?error=no_token");
        }

      } catch (err) {
        console.error("OAuth processing error:", err);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/?error=processing_failed");
      } finally {
        setIsProcessing(false);
      }
    };

    processOAuth();
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'spin 1s linear infinite',
          fontSize: '32px',
          marginBottom: '20px'
        }}>🔐</div>

        <h2 style={{
          margin: '0 0 16px 0',
          color: '#333',
          fontSize: '24px',
          fontWeight: '600'
        }}>
          로그인 처리 중
        </h2>

        <p style={{
          margin: '0',
          color: '#666',
          fontSize: '16px'
        }}>
          잠시만 기다려주세요...
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OAuthSuccess;