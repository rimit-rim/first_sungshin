import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import HomeLogo from "../assets/images/HomeLogo.png";
import BookmarkIcon from "../assets/images/Bookmark.png";
import ChatIcon from "../assets/images/Chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";
import commentIcon from "../assets/images/comment.png";

const PostDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const post = state;

  const [commentInput, setCommentInput] = useState("");
  const [commentList, setCommentList] = useState<string[]>([]);

  const handleAddComment = () => {
    if (commentInput.trim() !== "") {
      setCommentList((prev) => [...prev, commentInput]);
      setCommentInput("");
    }
  };

  if (!post) {
    return <div className="p-10 text-gray-500">게시글 데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="px-10 py-8 font-pretendard">
      {/* 로고 */}
      <div className="w-[1240px] flex justify-start py-4">
        <button onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Home Logo" className="h-[60px]" />
        </button>
      </div>

      {/* 네비게이션 */}
      <div className="w-[1240px] flex justify-end gap-4 mb-12 font-pretendard">
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

      {/* 게시판 제목 및 Create 버튼 */}
      <div className="flex items-center justify-between mb-6 w-[1240px]">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-xl">{`←`}</button>
          <h2 className="text-2xl font-semibold">Back</h2>
        </div>
        <button
          onClick={() => navigate("/create", { state: { board: "free" } })}
          className="bg-violet-100 text-black text-base px-4 py-2 rounded-xl"
        >
          Create
        </button>
      </div>

      {/* 게시글 본문 */}
      <div className="border border-gray-300 rounded-xl px-6 py-4 mb-10 w-[1240px]">
        <h3 className="text-xl font-medium mb-4">{post.title}</h3>
        <div className="space-y-4 text-sm text-gray-800 mb-8">
          {post.content.split("\n").map((line: string, idx: number) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        {/* 댓글 수 */}
        <div className="flex items-center gap-2 mb-4">
          <img src={commentIcon} alt="Comment" className="w-7 h-5" />
          <span className="text-sm">{commentList.length}</span>
        </div>

        {/* 댓글 입력창 */}
        <div className="flex gap-4 items-start mb-6">
          <textarea
            className="flex-1 border border-gray-300 rounded-xl p-3 resize-none h-20 text-sm"
            placeholder="Reply"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-violet-100 text-black px-6 py-2 rounded-xl text-sm font-medium hover:bg-violet-200 transition"
          >
            Comment
          </button>
        </div>

        {/* 댓글 리스트 */}
        <div className="space-y-4">
          {commentList.map((comment, idx) => (
            <div key={idx}>
              <p className="text-sm mb-1">{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;