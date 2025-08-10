import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-white font-pretendard">
      {/* 통일된 상단 헤더 (AcademicStudyClubs.tsx 스타일) */}
      <header
        className="sticky top-0 z-20 w-full bg-white
                   py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center
                   xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0"
      >
        {/* 로고 */}
        <div
          className="mb-4 h-16 w-auto flex-shrink-0
                     xl:absolute xl:top-[40px] xl:left-[100px] xl:w-[627px] xl:h-[105px]"
        >
          <Link to="/home">
            <img
              src={HomeLogo}
              alt="Welcome to Sungshin Logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* (선택) Back 영역 — 커뮤니티 홈에서는 비워둠 */}
        <div
          className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10
                     xl:absolute xl:top-[178px] xl:left-[100px] xl:right-[100px]"
        />

        {/* 네비게이션 */}
        <nav
          className="w-full flex justify-center text-gray-600 font-normal
                     xl:absolute xl:top-[178px] xl:right-[100px]
                     xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"
        >
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            <li className="flex items-center group">
              <Link
                to="/wiki"
                className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                           group-hover:bg-violet-100 group-hover:text-purple-600
                           group-focus:bg-purple-400 group-focus:text-white text-sm"
              >
                <img
                  src={BookmarkIcon}
                  alt="Bookmark Icon"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain"
                />
                SOOJEONG-WIKI
              </Link>
            </li>

            <li className="flex items-center group">
              <Link
                to="/chat"
                className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                           group-hover:bg-violet-100 group-hover:text-purple-600
                           group-focus:bg-purple-400 group-focus:text-white text-sm"
              >
                <img
                  src={ChatIcon}
                  alt="AI Chat Icon"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain"
                />
                AI Chat
              </Link>
            </li>

            {/* 현재 페이지: Community 활성색 */}
            <li className="flex items-center group">
              <Link
                to="/community"
                className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                           bg-violet-300 text-black
                           group-hover:bg-violet-100 group-hover:text-purple-600
                           group-focus:bg-purple-400 group-focus:text-white text-sm"
              >
                <img
                  src={CommunityIcon}
                  alt="Community Icon"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain"
                />
                Community
              </Link>
            </li>

            <li className="flex items-center group">
              <Link
                to="/mypage"
                className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                           group-hover:bg-violet-100 group-hover:text-purple-600
                           group-focus:bg-purple-400 group-focus:text-white text-sm"
              >
                <img
                  src={MyPageIcon}
                  alt="My Page Icon"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain"
                />
                My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 콘텐츠 컨테이너: 헤더 폭(좌우 100px 여백)과 정렬 맞춤 */}
      <main className="w-full flex justify-center">
        <section className="w-[1240px] px-4 sm:px-6 md:px-0 mt-6">
          {/* 섹션 타이틀 */}
          <h2 className="text-2xl font-bold mb-8">Community Boards</h2>

          {/* 2×2 그리드: 상단 2개, 하단 2개 / 헤더 폭에 맞춰 정렬 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Board for Free Use */}
            <div
              className="h-[200px] border rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:shadow-sm transition"
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
              className="h-[200px] border rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:shadow-sm transition"
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
              className="h-[200px] border rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:shadow-sm transition"
              onClick={() => handleNavigate("/community/career")}
            >
              <div className="text-2xl font-medium text-black">Careers</div>
              <div className="flex justify-between items-end">
                <div className="text-[#AEAEB2] font-light text-xl">
                  Share questions, opinions, and info about careers.
                </div>
                <img src={LearnMoreIcon} alt="Learn More" className="w-10 h-10" />
              </div>
            </div>

            {/* Advertise/Promotion */}
            <div
              className="h-[200px] border rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:shadow-sm transition"
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
        </section>
      </main>
    </div>
  );
};

export default CommunityHome;