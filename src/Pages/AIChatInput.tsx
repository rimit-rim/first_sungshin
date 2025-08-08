import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        question: trimmed
      });

      // AI 응답 추가
      setChatMessages((prev) => [...prev, { 
        sender: "ai", 
        content: response.data.answer 
      }]);
    } catch (error) {
      console.error("챗봇 API 호출 실패:", error);
      
      // 에러 발생 시 사용자에게 알림
      setChatMessages((prev) => [...prev, { 
        sender: "ai", 
        content: "죄송합니다. 현재 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요." 
      }]);
    } finally {
      setIsTyping(false); // 응답 완료
    }
  };

  // 로딩 중이거나 로그인되지 않은 경우 표시하지 않음
  if (isLoading) {
    return (
      <div className="relative w-[1440px] h-[1024px] bg-white flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative w-[1440px] h-[1024px] bg-white font-pretendard">
      {/* 로고 */}
      <header className="absolute top-[65px] left-[100px]">
        <button onClick={() => navigate("/home")}>
          <img src={HomeLogo} alt="Welcome To Sungshin Logo" className="w-auto h-[60px]" />
        </button>
      </header>

      {/* 네비게이션 */}
      <nav className="absolute w-[783px] h-[50px] top-[178px] right-[100px] flex gap-[21px] justify-end font-pretendard">
        <button
          onClick={() => navigate("/wiki")}
          className="w-[180px] h-[50px] rounded-[20px] border border-black flex items-center justify-center gap-2 hover:bg-[#E5DFFD] transition"
        >
          <img src={BookmarkIcon} alt="Sujeong Wiki" className="w-5 h-5" />
          <span className="[font-family:'Pretendard_Variable-Light'] font-light">SUJEONG-WIKI</span>
        </button>
        <button
          className="w-[180px] h-[50px] rounded-[20px] bg-[#B6A1FA] flex items-center justify-center gap-2 font-semibold"
        >
          <img src={ChatIcon} alt="AI Chat" className="w-5 h-5" />
          <span className="[font-family:'Pretendard_Variable-Medium']">AI Chat</span>
        </button>
        <button
          onClick={() => navigate("/community")}
          className="w-[180px] h-[50px] rounded-[20px] border border-black flex items-center justify-center gap-2 hover:bg-[#E5DFFD] transition"
        >
          <img src={CommunityIcon} alt="Community" className="w-5 h-5" />
          <span className="[font-family:'Pretendard_Variable-Light'] font-light">Community</span>
        </button>
        <button
          onClick={() => navigate("/mypage")}
          className="w-[180px] h-[50px] rounded-[20px] border border-black flex items-center justify-center gap-2 hover:bg-[#E5DFFD] transition"
        >
          <img src={MyPageIcon} alt="My Page" className="w-5 h-5" />
          <span className="[font-family:'Pretendard_Variable-Light'] font-light">My Page</span>
        </button>
      </nav>

      {/* 채팅 컨테이너 */}
      <main className="absolute w-[1440px] h-[761px] top-[263px] left-0 flex justify-center">
        <section className="w-[1235px] h-[782px] bg-indigo-100 border border-black rounded-[40px] flex flex-col justify-between px-6 py-8">
          {/* 메시지 출력 */}
          <div className="flex-1 overflow-y-auto mb-4">
            {chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-lg">안녕하세요! 궁금한 것이 있으시면 언제든 물어보세요.</p>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={1}
                placeholder="Ask me what you are curious about school life."
                className="[font-family:'Pretendard_Variable-Regular',Helvetica] w-full resize-none text-black placeholder:text-[#AEAEB2] text-base focus:outline-none bg-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors ${
                inputValue.trim() && !isTyping ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
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