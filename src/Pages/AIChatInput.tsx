import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios"; // axios 인스턴스 import

import HomeLogo from "../assets/images/HomeLogo.png";
import BookmarkIcon from "../assets/images/Bookmark.png";
import ChatIcon from "../assets/images/chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";

type ChatMessage = {
  sender: "user" | "ai";
  content: string;
};

const AIChatInput = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false); // 챗봇이 응답 중인지 표시

  // ✅ 자동 리사이즈용 ref/상수/함수
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_INPUT_HEIGHT = 160; // px (필요 시 120~200 사이로 조정 권장)

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newH = Math.min(el.scrollHeight, MAX_INPUT_HEIGHT);
    el.style.height = `${newH}px`;
    el.style.overflowY = el.scrollHeight > MAX_INPUT_HEIGHT ? "auto" : "hidden";
  };

  useEffect(() => {
    autoResize(); // 입력값 변화 시 높이 재계산
  }, [inputValue]);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");
      return;
    }
    setIsLoggedIn(true);
    setIsLoading(false);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // 사용자 메시지 추가
    setChatMessages((prev) => [...prev, { sender: "user", content: trimmed }]);
    setInputValue("");
    setIsTyping(true); // 챗봇 응답 중 표시

    try {
      // 챗봇 API 호출
      const response = await api.post("/api/chat", {
        question: trimmed,
      });

      // AI 응답 추가
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", content: response.data.answer },
      ]);
    } catch (error) {
      console.error("챗봇 API 호출 실패:", error);

      // 에러 발생 시 사용자에게 알림
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          content:
            "죄송합니다. 현재 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsTyping(false); // 응답 완료
    }
  };

  // 로딩 중이거나 로그인되지 않은 경우 표시하지 않음
  if (isLoading) {
    return (
      <div className="relative w-[1440px] h-[1024px] bg-white flex items-center justify-center">
        <div className="text-xl">Being loaded ...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-pretendard">
      {/* 통일된 상단 헤더 */}
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

        {/* (선택) 백 버튼 자리 — AI Chat에서는 없음 */}
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

            {/* 현재 페이지: AI Chat 활성 */}
            <li className="flex items-center group">
              <Link
                to="/chat"
                className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                           bg-violet-300 text-black
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

            <li className="flex items-center group">
              <Link
                to="/community"
                className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200
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

      {/* 채팅 컨테이너 */}
      <main className="absolute w-[1440px] h-[761px] top-[263px] left-0 flex justify-center">
        <section className="w-[1235px] h-[782px] bg-indigo-100 border border-black rounded-[40px] flex flex-col justify-between px-6 py-8">
          {/* 메시지 출력 */}
          <div className="flex-1 overflow-y-auto mb-4">
            {chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-0">
                <p className="text-lg">
                  Ask me what you are curious about school life.<br></br>
                  For example: Where is the Soojeong Hall?, <br></br>
                  How do I get to the Sungshin Hall from the Student Hall?
                </p>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-black text-base ${
                      msg.sender === "user" ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 입력창 */}
          <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
            <div className="flex-1 border border-[#AEAEB2] rounded-full px-6 py-3 bg-white">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  autoResize();
                }}
                onFocus={autoResize}
                rows={1}
                placeholder="Ask me what you are curious about school life."
                className="[font-family:'Pretendard_Variable-Regular',Helvetica] w-full resize-none
                           text-black placeholder:text-[#AEAEB2] text-base focus:outline-none bg-white
                           leading-6 max-h-40 overflow-y-auto"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors ${
                inputValue.trim() && !isTyping
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              ↑
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AIChatInput;