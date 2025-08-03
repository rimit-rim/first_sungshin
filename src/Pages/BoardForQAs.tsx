import React from "react";
import { useNavigate } from "react-router-dom";

import HomeLogo from "../assets/images/HomeLogo.png";
import commentIcon from "../assets/images/comment.png";
import BookmarkIcon from "../assets/images/bookmark.png";
import ChatIcon from "../assets/images/chat.png";
import CommunityIcon from "../assets/images/collaborating-in-circle.png";
import MyPageIcon from "../assets/images/admin-settings-male.png";

type Post = {
  id: number;
  title: string;
  content: string;
  commentCount: number;
};

interface Props {
  posts: Post[];
}

const BoardForQAs: React.FC<Props> = ({ posts }) => {
  const navigate = useNavigate();
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center w-full font-pretendard">
      {/* 상단: 왼쪽 정렬 로고 */}
      <div className="w-[1240px] flex justify-start py-4">
        <button onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Home Logo" className="h-[60px]" />
        </button>
      </div>

      {/* 네비게이션: 오른쪽 정렬 */}
      <div className="w-[1240px] flex justify-end gap-4 mb-12">
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

      {/* 게시판 제목 */}
      <div className="w-[1240px] flex items-center justify-between mb-6">
        <div className="text-[28pt] font-medium">Q&A</div>
        <button
          onClick={() => navigate("/create", { state: { board: "qna" } })}
          className="bg-violet-100 text-black text-base px-4 py-2 rounded-xl"
        >
          Create
        </button>
      </div>

      {/* 게시글 리스트 */}
      <div className="w-[1240px] flex flex-col gap-4">
        {sortedPosts.length === 0 ? (
          <p className="text-gray-500 text-lg">Nothing has been posted yet.</p>
        ) : (
          sortedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`, { state: post })}
              className="w-[1240px] h-[164px] border-b border-gray-200 flex flex-col justify-between py-4 cursor-pointer hover:bg-gray-50"
            >
              {/* 제목 */}
              <div className="w-[1096px] h-[44px] text-[20pt] font-medium truncate">
                {post.title}
              </div>

              {/* 본문 첫 줄만 표시 */}
              <div className="w-[1096px] h-[40px] text-[17pt] font-light text-black truncate">
                {post.content.split("\n")[0]}
              </div>

              {/* 댓글 수 */}
              <div className="w-[92px] h-[35px] flex items-center gap-2 mt-2">
                <img src={commentIcon} alt="comment" className="w-7 h-5" />
                <span className="text-[16pt]">{post.commentCount}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardForQAs;