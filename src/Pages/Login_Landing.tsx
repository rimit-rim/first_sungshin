import React from "react";

interface LoginLandingProps {
  className?: string;
  googleLogoIcon: string;
  property1?: string;
}

const Login_Landing = ({ className, googleLogoIcon, property1 }: LoginLandingProps): React.JSX.Element => {
  return (
    <div className={className}>
      <div className="w-full flex justify-center">
        <button className="w-full max-w-[425px] h-[48px] flex items-center justify-center gap-3 border border-gray-300 rounded shadow hover:bg-gray-100 transition">
          <img src={googleLogoIcon} alt="Google Logo" className="w-8 h-8" />
          <span className="text-[20px] font-light font-pretendard">
            {property1 === "default" ? "Continue With Google" : "Other Login"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login_Landing;