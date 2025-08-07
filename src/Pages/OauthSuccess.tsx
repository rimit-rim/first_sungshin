import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
    } else {
      console.error("No token is available.");
      navigate("/"); // fallback
    }
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OAuthSuccess;