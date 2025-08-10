import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios"; // axios 인스턴스 import

import HomeLogo from "../assets/images/HomeLogo.png";
import commentIcon from "../assets/images/comment.png";
import BookmarkIcon from "../assets/images/bookmark.png";
import ChatIcon from "../assets/images/chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";

type Post = {
  id: number;
  title: string;
  content: string;
  commentCount?: number;
  createdAt?: string;
  author?: string;
};

const BoardForQAs: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("📡 Fetching Q&A board posts...");
        const response = await api.get("/api/community/qna");
        console.log("✅ Q&A posts fetched:", response.data);
        setPosts(response.data);
      } catch (error: any) {
        console.error("❌ Failed to fetch Q&A posts:", error);

        if (error.response?.status === 401) {
          setError("Please login to view posts");
        } else {
          setError("Failed to load posts");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full font-pretendard">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading posts...</div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col items-center w-full font-pretendard">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-red-500 mb-4">{error}</div>
            <button
              onClick={() => navigate("/community")}
              className="px-4 py-2 bg-purple-100 rounded hover:bg-purple-200 transition"
            >
              Back to Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 최신 글이 위에 오도록 정렬
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center w-full font-pretendard">
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

        {/* Back 버튼 */}
        <div
          className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10
                     xl:absolute xl:top-[178px] xl:left-[100px] xl:right-[100px]"
        >
          <Link to="/community">
            <span className="text-gray-600 hover:text-purple-600">← Back</span>
          </Link>
        </div>

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

      {/* 게시판 제목 */}
      <div className="w-[1240px] flex items-center justify-between mb-6 mt-6">
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No questions yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Be the first to ask a question!
            </p>
          </div>
        ) : (
          sortedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/community/post/${post.id}`)}
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

              {/* 메타 정보 및 댓글 영역 */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <img src={commentIcon} alt="comment" className="w-7 h-5" />
                  <span className="text-[16pt]">{post.commentCount || 0}</span>
                </div>

                {/* 작성자와 날짜 정보 */}
                <div className="text-sm text-gray-500">
                  {post.author && <span>{post.author}</span>}
                  {post.createdAt && (
                    <span className="ml-2">
                      • {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardForQAs;