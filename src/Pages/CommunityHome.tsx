import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LearnMoreIcon from "../assets/images/LearnMore.png"; // 화살표 이미지
import HomeLogo from "../assets/images/HomeLogo.png";
import BookmarkIcon from "../assets/images/Bookmark.png";
import ChatIcon from "../assets/images/chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";

const CommunityHome = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleNavigate = (path: string) => {
    if (!isLoggedIn) {
    const confirmed = window.confirm("Login Required");
    if (confirmed) {
      navigate("/community", { state: { from: "/community" } });
    }
    return;
  }

  navigate(path);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="w-full max-w-[1440px] max-h-[1024px] mx-auto px-4 py-8 font-pretendard">
      {/* 상단 제목 */}
      <div className="w-[1240px] flex justify-start py-4">
        <button onClick={() => navigate("/home")}>
          <img src={HomeLogo} alt="Home Logo" className="h-[60px]" />
        </button>
      </div>

      {/* 네비게이션 */}
      <div className="flex justify-end gap-4 mb-12">
        <button
          onClick={() => navigate("/wiki")}
          className="w-[200px] h-[40px] rounded flex items-center justify-center gap-2 hover:bg-[#E5DFFD] hover:font-semibold active:bg-[#B6A1FA] active:font-semibold transition"
        >
        <img src={BookmarkIcon} alt="Sujeong Wiki" className="w-5 h-5" />
          SUJEONG-WIKI
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="w-[180px] h-[40px] rounded flex items-center justify-center gap-2 hover:bg-[#E5DFFD] hover:font-semibold active:bg-[#B6A1FA] active:font-semibold transition"
        >
          <img src={ChatIcon} alt="AI Chat" className="w-5 h-5" />
          AI Chat
        </button>
        <button
          onClick={() => navigate("/community")}
          className="w-[180px] h-[40px] rounded flex items-center justify-center gap-2 bg-[#B6A1FA] font-semibold"
        >
          <img src={CommunityIcon} alt="Community" className="w-5 h-5" />
          Community
        </button>
        <button
          onClick={() => navigate("/mypage")}
          className="w-[180px] h-[40px] border rounded flex items-center justify-center gap-2 hover:bg-[#E5DFFD] hover:font-semibold active:bg-[#B6A1FA] active:font-semibold transition"
        >
          <img src={MyPageIcon} alt="MyPage" className="w-5 h-5" />
          My Page
        </button>
      </div>

      {/* 커뮤니티 섹션 */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Community Boards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-[0px]">
          {/* Board for Free Use */}
          <div
            className="w-[600px] h-[200px] border rounded-xl p-6 flex flex-col justify-between cursor-pointer"
            onClick={() => handleNavigate("/community/free")}
          >
            <div className="text-2xl font-medium text-black">
              Board for Free Use
            </div>
            <div className="flex justify-between items-end">
              <div className="text-[#AEAEB2] font-light text-xl">
                Have conversation with other students freely.
              </div>
              <img src={LearnMoreIcon} alt="Learn More" className="w-10 h-10" />
            </div>
          </div>

          {/* Q&As */}
          <div
            className="w-[600px] h-[200px] border rounded-xl p-6 flex flex-col justify-between cursor-pointer"
            onClick={() => handleNavigate("/community/qna")}
          >
            <div className="text-2xl font-medium text-black">Q&As</div>
            <div className="flex justify-between items-end">
              <div className="text-[#AEAEB2] font-light text-xl">Q&As</div>
              <img src={LearnMoreIcon} alt="Learn More" className="w-10 h-10" />
            </div>
          </div>

          {/* Careers */}
          <div
            className="w-[600px] h-[200px] border rounded-xl p-6 flex flex-col justify-between cursor-pointer"
            onClick={() => handleNavigate("/community/career")}
          >
            <div className="text-2xl font-medium text-black">Careers</div>
            <div className="flex justify-between items-end">
              <div className="text-[#AEAEB2] font-light text-xl">Share questions, opinions, and info about careers.</div>
              <img src={LearnMoreIcon} alt="Learn More" className="w-10 h-10" />
            </div>
          </div>

          {/* Advertise/Promotion */}
          <div
            className="w-[600px] h-[200px] border rounded-xl p-6 flex flex-col justify-between cursor-pointer"
            onClick={() => handleNavigate("/community/promo")}
          >
            <div className="text-2xl font-medium text-black">
              Advertise/Promotion
            </div>
            <div className="flex justify-between items-end">
              <div className="text-[#AEAEB2] font-light text-xl">
                Promote/Advertise special school-related events and occasions.
              </div>
              <img src={LearnMoreIcon} alt="Learn More" className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHome;