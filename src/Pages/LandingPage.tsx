import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LandingLogo from "../assets/images/LandingLogo.png";
import Landing from "../assets/images/Landing.jpg";
import Login_Landing from "./Login_Landing";
import GoogleLogo from "../assets/images/google_logo.png";

const LandingPage = (): React.JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* 좌측: 배경 이미지 + 문구 */}
      <div
        className="relative w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Landing})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-gray-700/50 to-black/80"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold text-left space-y-2">
          <div>Gateway</div>
          <div>For</div>
          <div>International</div>
          <div>Students</div>
        </div>
      </div>

      {/* 우측: 로고 + 로그인 */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white text-center px-8 py-6 relative">
        <img src={LandingLogo} alt="Landing Logo" className="w-60 h-auto mb-12" />
        <Login_Landing
          className=""
          googleLogoIcon={GoogleLogo}
          property1="default"
        />
        <Link
          to="/wiki"
          className="mt-8 px-4 py-2 border border-gray-300 rounded-lg text-[#aeaeb2] text-sm hover:bg-gray-100 transition"
        >
          View only SUJEONG-WIKI without logging in.
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;