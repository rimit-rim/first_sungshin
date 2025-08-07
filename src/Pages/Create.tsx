import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// 이미지 import
import HomeLogo from "../assets/images/HomeLogo.png";
import BookmarkIcon from "../assets/images/Bookmark.png";
import ChatIcon from "../assets/images/Chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";

// 게시글 타입 정의
type Post = {
  id: number;
  title: string;
  content: string;
  commentCount: number;
};

interface Props {
  onPost: (post: Post, board: string) => void;
}

const Create: React.FC<Props> = ({ onPost }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const board = location.state?.board; // 'free', 'career', 'promo', 'qna'

  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handlePost = () => {
    if (!title.trim() || !bodyText.trim()) {
      alert("You have to fill in the both title and content container");
      return;
    }

    if (!board) {
      alert("The board does not exist.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title,
      content: bodyText,
      commentCount: 0,
    };

    onPost(newPost, board); // App.tsx에서 전달된 함수 호출
    navigate(`/community/${board}`); // 해당 게시판으로 이동
  };

  return (
    <div className="w-full min-h-screen px-8 md:px-20 py-10 font-pretendard">
      {/* 헤더 로고 */}
      <div className="flex justify-center mb-6">
        <button onClick={() => navigate("/home")}>
          <img
            src={HomeLogo}
            alt="Home"
            className="w-40 hover:opacity-80 transition"
          />
        </button>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => navigate("/wiki")}
          className="w-[200px] h-[40px] rounded flex items-center justify-center gap-2 hover:bg-[#E5DFFD] hover:font-semibold transition"
        >
          <img src={BookmarkIcon} alt="Sujeong Wiki" className="w-5 h-5" />
          SUJEONG-WIKI
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="w-[180px] h-[40px] rounded flex items-center justify-center gap-2 hover:bg-[#E5DFFD] hover:font-semibold transition"
        >
          <img src={ChatIcon} alt="AI Chat" className="w-5 h-5" />
          AI Chat
        </button>
        <button
          disabled
          className="w-[180px] h-[40px] rounded flex items-center justify-center gap-2 bg-[#E5DFFD] font-semibold text-black cursor-default"
        >
          <img src={CommunityIcon} alt="Community" className="w-5 h-5" />
          Community
        </button>
        <button
          onClick={() => navigate("/mypage")}
          className="w-[140px] h-[40px] rounded flex items-center justify-center gap-2 border border-black hover:bg-gray-100 transition"
        >
          <img src={MyPageIcon} alt="My Page" className="w-5 h-5" />
          My Page
        </button>
      </div>

      {/* 글 작성 폼 */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Title"
          />
        </div>

        <div>
          <label htmlFor="bodyText" className="block mb-2 font-semibold">
            Body Text
          </label>
          <textarea
            id="bodyText"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            className="w-full h-40 border border-gray-400 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Write"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handlePost}
            className="px-6 py-2 bg-[#E5DFFD] rounded-full font-semibold hover:bg-[#D2C2FB] transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;