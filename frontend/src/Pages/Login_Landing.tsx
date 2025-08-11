import React from "react";

interface LoginLandingProps {
  className?: string;
  googleLogoIcon: string;
  property1?: string;
}

const Login_Landing = ({ className, googleLogoIcon, property1 }: LoginLandingProps): React.JSX.Element => {
  // 환경에 따른 API URL 설정
  const API_BASE_URL = import.meta.env.MODE === 'production'
    ? 'https://welcometosungshin-be.onrender.com'
    : 'http://localhost:8000';

  // 클릭 핸들러 정의
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google/login`;
  };

  return (
    <div className={className}>
      <div className="w-full flex justify-center font-pretendard">
        <button
          onClick={handleGoogleLogin}
          className="w-full max-w-[425px] h-[53px] flex items-center justify-center gap-3 border border-gray-300 rounded shadow hover:bg-gray-100 transition"
        >
          <img src={googleLogoIcon} alt="Google Logo" className="w-5 h-5" />
          <span className="text-[22px] font-light font-pretendard">
            {property1 === "default" ? "Continue With Google" : "Other Login"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login_Landing;