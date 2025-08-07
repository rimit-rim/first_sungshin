import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios"; // axios 인스턴스 import

import HomeLogo from "../assets/images/HomeLogo.png";
import BookmarkIcon from "../assets/images/Bookmark.png";
import ChatIcon from "../assets/images/Chat.png";
import CommunityIcon from "../assets/images/Collaborating In Circle.png";
import MyPageIcon from "../assets/images/Admin Settings Male.png";
import commentIcon from "../assets/images/comment.png";

// 타입 정의
type Post = {
  id: number;
  title: string;
  content: string;
  author?: string;
  created_at?: string;
  board_slug?: string;
};

type Comment = {
  id: number;
  content: string;
  author?: string;
  created_at?: string;
};

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 게시글 데이터 로드
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError("Post ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        // 게시글 상세 조회 - 토큰은 자동으로 포함됨
        const postResponse = await api.get(`/api/community/post/${postId}`);
        setPost(postResponse.data);

        // 댓글 조회 - 토큰은 자동으로 포함됨
        const commentsResponse = await api.get(`/api/community/post/${postId}/comments`);
        setComments(commentsResponse.data || []);

      } catch (error: any) {
        console.error("Failed to fetch post:", error);

        if (error.response?.status === 404) {
          setError("Post not found");
        } else if (error.response?.status === 401) {
          setError("Please login to view this post");
          // 401 에러는 axios interceptor에서 자동 처리됨
        } else {
          setError("Failed to load post");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // 댓글 추가
  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    setIsSubmitting(true);

    try {
      // 댓글 작성 - 토큰은 자동으로 포함됨
      const response = await api.post(`/api/community/post/${postId}/comments`, {
        content: commentInput.trim()
      });

      // 새 댓글을 목록에 추가
      setComments(prev => [...prev, response.data]);
      setCommentInput("");

    } catch (error: any) {
      console.error("Failed to add comment:", error);

      if (error.response?.status === 401) {
        alert("Authentication failed. Please login again.");
        // 401 에러는 axios interceptor에서 자동 처리됨
      } else {
        alert(error.response?.data?.detail || "Failed to add comment");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading post...</div>
      </div>
    );
  }

  // 에러 상태
  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-red-500 mb-4">{error || "Post not found"}</div>
          <button
            onClick={() => navigate("/community")}
            className="px-4 py-2 bg-purple-100 rounded hover:bg-purple-200 transition"
          >
            Back to Community
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-8 font-pretendard">
      {/* 로고 */}
      <div className="w-[1240px] flex justify-start py-4">
        <button onClick={() => navigate("/home")}>
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

      {/* 게시판 제목 및 뒤로가기 */}
      <div className="flex items-center justify-between mb-6 w-[1240px]">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-xl">{`←`}</button>
          <h2 className="text-2xl font-semibold">Back</h2>
        </div>
        {post.board_slug && (
          <button
            onClick={() => navigate(`/create`, { state: { board: post.board_slug } })}
            className="bg-violet-100 text-black text-base px-4 py-2 rounded-xl"
          >
            Create
          </button>
        )}
      </div>

      {/* 게시글 본문 */}
      <div className="border border-gray-300 rounded-xl px-6 py-4 mb-10 w-[1240px]">
        <h3 className="text-xl font-medium mb-2">{post.title}</h3>

        {/* 게시글 메타정보 */}
        <div className="text-sm text-gray-500 mb-4 border-b pb-2">
          {post.author && <span>By {post.author}</span>}
          {post.created_at && (
            <span className="ml-2">
              • {new Date(post.created_at).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* 게시글 내용 */}
        <div className="space-y-4 text-sm text-gray-800 mb-8 whitespace-pre-wrap">
          {post.content}
        </div>

        {/* 댓글 수 */}
        <div className="flex items-center gap-2 mb-4">
          <img src={commentIcon} alt="Comment" className="w-7 h-5" />
          <span className="text-sm">{comments.length}</span>
        </div>

        {/* 댓글 입력창 */}
        <div className="flex gap-4 items-start mb-6">
          <textarea
            className="flex-1 border border-gray-300 rounded-xl p-3 resize-none h-20 text-sm"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            onClick={handleAddComment}
            disabled={isSubmitting || !commentInput.trim()}
            className="bg-violet-100 text-black px-6 py-2 rounded-xl text-sm font-medium hover:bg-violet-200 transition disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Comment"}
          </button>
        </div>

        {/* 댓글 리스트 */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-purple-200 pl-4">
                <div className="text-xs text-gray-500 mb-1">
                  {comment.author && <span>{comment.author}</span>}
                  {comment.created_at && (
                    <span className="ml-2">
                      • {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;