import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import adminSettingsMale from "../assets/images/admin-settings-male.png";
import bookmark from "../assets/images/bookmark.png";
import chat from "../assets/images/chat.png";
import collaboratingInCircle from "../assets/images/collaborating-in-circle.png";
import logoWithText from "../assets/images/HomeLogo.png"; // 로고+텍스트 통합 이미지

// type ChatMessage = {
//   sender: "user" | "ai";
//   content: string;
// };

const AIChatHome = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("ai-chat");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginAlertShown, setIsLoginAlertShown] = useState<boolean>(false);
  //const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const navigationItems = [
    {
      id: "sujeong-wiki",
      icon: bookmark,
      label: "SUJEONG-WIKI",
      path: "/SoojeongWiki",
    },
    {
      id: "ai-chat",
      icon: chat,
      label: "AI Chat",
      path: "/AIChatHome",
    },
    {
      id: "community",
      icon: collaboratingInCircle,
      label: "Community",
      path: "/CommunityHome",
    },
    {
      id: "my-page",
      icon: adminSettingsMale,
      label: "My Page",
      path: "/MyPage",
    },
  ];

  const handleNavClick = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Submitted:", inputValue);
      setInputValue("");
    }
  };

  const exampleQuestions = [
    "Ask me what you are curious about school life.",
    "For example: How do I get to Soojeong Building from Students Hall?",
    "For example: What is the school lunch today?",
  ];

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  // 로그인 안 된 경우 입력을 막고 팝업 띄우기
  const requireLoginCheck = () => {
    if (!isLoggedIn && !isLoginAlertShown) {
      setIsLoginAlertShown(true);
      alert("Login Required");
      return;
    }

    if (isLoggedIn) {
    navigate("/chat/input"); // ✅ 로그인된 경우 채팅 페이지로 이동
    }
  };

  return (
    <div className="relative w-[1440px] h-[1024px] bg-white">
      {/* 로고 (이미지 한 장으로 처리) */}
      <header className="absolute top-[65px] left-[100px]">
        <img src={logoWithText} alt="Welcome To Sungshin" className="w-[500px] h-auto" />
      </header>

      {/* 내비게이션 */}
      <nav className="absolute w-[783px] h-[50px] top-[178px] right-[100px] flex gap-[21px] justify-end">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id, item.path)}
              className={`
                flex items-center gap-[5px] w-[180px] h-[50px] px-[5px] py-[9px] rounded-[20px] border border-solid border-black
                ${isActive ? "bg-violet-300" : "bg-white"} 
                hover:bg-violet-100 transition-colors duration-200
              `}
            >
              <img src={item.icon} alt="" className="w-[35px] h-[35px]" />
              <span
                className={`
                  text-xl text-black whitespace-nowrap
                  ${isActive
                    ? "[font-family:'Pretendard_Variable-Medium',Helvetica] font-medium"
                    : "[font-family:'Pretendard_Variable-Light',Helvetica] font-light"}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>


      {/* 메인 */}
      <main className="absolute w-full top-[263px] left-0 flex justify-center">
        <section className="w-[1235px] h-[782px] px-40 py-[183px] bg-white border border-black rounded-[40px] flex flex-col items-center gap-[60px]">
          <h2 className="text-[40px] font-medium text-black">
            What can I help you with?
          </h2>

          <form onSubmit={handleSubmit} className="w-full max-w-[914px]">
            <div className="relative w-[914px] h-[145px] px-[39px] py-[27px] border border-[#AEAEB2] rounded-[42px]">
              <label htmlFor="chat-input" className="sr-only">
                Ask your question about school life
              </label>
              <textarea
                id="chat-input"
                value={inputValue}
                onFocus={requireLoginCheck} // 포커스 시 한 번만 검사
                onChange={(e) => {
                  if (!isLoggedIn) {
                    requireLoginCheck();
                    return;
                  }
                  navigate("/chat/input");
                }}
                placeholder="Ask me what you are curious about school life."
                className="w-full h-full resize-none text-xl text-black placeholder:text-[#AEAEB2] focus:outline-none"
                rows={3}
              />
              {!inputValue && (
                <div className="absolute inset-0 px-[39px] py-[27px] pointer-events-none">
                  {exampleQuestions.map((question, index) => (
                    <p
                      key={index}
                      className="text-xl text-[#AEAEB2]"
                    >
                      {question}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="sr-only" disabled={!inputValue.trim()}>
              Submit question
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AIChatHome;