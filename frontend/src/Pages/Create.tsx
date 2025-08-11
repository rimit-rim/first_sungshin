import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios"; // axios 인스턴스 import

// 이미지 import
import HomeLogo from "../assets/images/HomeLogo.png";
import BookmarkIcon from "../assets/images/bookmark.png";
import ChatIcon from "../assets/images/Chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";

const Create: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const board = location.state?.board; // 'free', 'career', 'promo', 'qna'

  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !bodyText.trim()) {
      alert("You have to fill in both title and content");
      return;
    }

    if (!board) {
      alert("The board does not exist.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API로 게시글 생성 요청 - 토큰은 자동으로 포함됨
      const response = await api.post(`/api/community/${board}`, {
        title: title.trim(),
        content: bodyText.trim()
      });

      // 성공시 해당 게시판으로 이동
      alert("Post created successfully!");
      navigate(`/community/${board}`);

    } catch (error: any) {
      console.error("Failed to create post:", error);

      if (error.response?.status === 401) {
        alert("Authentication failed. Please login again.");
        // 401 에러는 axios interceptor에서 자동 처리됨
      } else if (error.response?.status === 403) {
        alert("You don't have permission to create posts.");
      } else {
        alert(error.response?.data?.detail || "Failed to create post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
          className="w-[180px] h-[40px] rounded flex items-center justify-center gap-2 bg-[#B6A1FA] font-semibold text-black cursor-default"
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

      {/* 게시판 표시 */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="text-lg font-semibold text-gray-600">
          Writing in: <span className="text-purple-600 capitalize">{board}</span> Board
        </div>
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
            disabled={isSubmitting}
            className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:bg-gray-100"
            placeholder="Enter post title"
            maxLength={200}
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
            disabled={isSubmitting}
            className="w-full h-40 border border-gray-400 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:bg-gray-100"
            placeholder="Write your content here..."
            maxLength={5000}
          />
          <div className="text-sm text-gray-500 mt-1">
            {bodyText.length}/5000 characters
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(`/community/${board}`)}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-400 rounded-full font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={isSubmitting || !title.trim() || !bodyText.trim()}
            className="px-6 py-2 bg-[#E5DFFD] rounded-full font-semibold hover:bg-[#D2C2FB] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;