import Router from './routes/Router';

// function App() {
//   return <Router />;

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 import
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import MyPage from "./Pages/MyPage";
import SoojeongWiki from "./Pages/SoojeongWiki";
import SchoolClubs from "./Pages/SchoolClubs";
import PerformanceClubs from "./Pages/PerformanceClubs";
import ReligionClubs from "./Pages/ReligionClubs";
import ArtClubs from "./Pages/ArtClubs";
import HobbyClubs from "./Pages/HobbyClubs";
import SportsClubs from "./Pages/SportsClubs";
import CommunityServiceClubs from "./Pages/CommunityServiceClubs";
import AcademicStudyClubs from "./Pages/AcademicStudyClubs";
import CampusMapSJ from "./Pages/CampusMapSJ";
import CampusMapWJ from "./Pages/CampusMapWJ";
import SchoolInfo from "./Pages/SchoolInfo";
import CommunityHome from "./Pages/CommunityHome";
import BoardForFreeUse from "./Pages/BoardForFreeUse";
import BoardForCareer from "./Pages/BoardForCareer";
import BoardForQAs from "./Pages/BoardForQAs";
import BoardForPromo from "./Pages/BoardForPromo";
import Create from "./Pages/Create";
import PostDetails from "./Pages/Post";
import AIChatHome from "./Pages/AIChatHome";
import AIChatInput from "./Pages/AIChatInput";
import Home from "./Pages/Home";

type Post = {
  id: number;
  title: string;
  content: string;
  commentCount: number;
};

function App() {
  const [freePosts, setFreePosts] = useState<Post[]>([]);
  const [careerPosts, setCareerPosts] = useState<Post[]>([]);
  const [qaPosts, setQaPosts] = useState<Post[]>([]);
  const [promoPosts, setPromoPosts] = useState<Post[]>([]);

  const handlePost = (post: Post, board: string) => {
    if (board === "free") setFreePosts((prev) => [post, ...prev]);
    else if (board === "career") setCareerPosts((prev) => [post, ...prev]);
    else if (board === "qna") setQaPosts((prev) => [post, ...prev]);
    else if (board === "promo") setPromoPosts((prev) => [post, ...prev]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wiki" element={<SoojeongWiki />} />
        <Route path="/map/soojeong" element={<CampusMapSJ />} />
        <Route path="/map/woonjeong" element={<CampusMapWJ />} />
        <Route path="/clubs" element={<SchoolClubs />} />
        <Route path="/schoolclubs/performanceclubs" element={<PerformanceClubs />} />
        <Route path="/schoolclubs/religionclubs" element={<ReligionClubs />} />
        <Route path="/schoolclubs/artclubs" element={<ArtClubs />} />
        <Route path="/schoolclubs/communityserviceclubs" element={<CommunityServiceClubs />} />
        <Route path="/schoolclubs/hobbyclubs" element={<HobbyClubs />} />
        <Route path="/schoolclubs/sportsclubs" element={<SportsClubs />} />
        <Route path="/schoolclubs/academicstudyclubs" element={<AcademicStudyClubs />} />
        <Route path="/schoolinfo" element={<SchoolInfo />} />
        <Route path="/chat" element={<AIChatHome />} />
        <Route path="/chat/input" element={<AIChatInput />} />
        <Route path="/home" element={<Home />} />

        {/* 커뮤니티 */}
        <Route path="/community" element={<CommunityHome />} />
        <Route path="/community/free" element={<BoardForFreeUse posts={freePosts} />} />
        <Route path="/community/career" element={<BoardForCareer posts={careerPosts} />} />
        <Route path="/community/qna" element={<BoardForQAs posts={qaPosts} />} />
        <Route path="/community/promo" element={<BoardForPromo posts={promoPosts} />} />
        <Route path="/create" element={<Create onPost={handlePost} />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;