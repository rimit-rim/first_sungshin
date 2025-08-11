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
// import AIChatHome from "./Pages/AIChatHome";
import AIChatInput from "./Pages/AIChatInput";
import Home from "./Pages/Home";
import HelloTest from './Pages/HelloTest';
import OauthSuccess from './Pages/OauthSuccess';

function App() {
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
        <Route path="/chat" element={<AIChatInput />} />
        {/* <Route path="/chat/input" element={<AIChatInput />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<HelloTest />} />
        <Route path="/oauth-success" element={<OauthSuccess />} />

        {/* 커뮤니티 - API 연동 완료 */}
        <Route path="/community" element={<CommunityHome />} />
        <Route path="/community/free" element={<BoardForFreeUse />} />
        <Route path="/community/career" element={<BoardForCareer />} />
        <Route path="/community/qna" element={<BoardForQAs />} />
        <Route path="/community/promo" element={<BoardForPromo />} />

        {/* 글 작성 - API 연동으로 변경 */}
        <Route path="/create" element={<Create />} />

        {/* 게시글 상세 - API 연동으로 변경 */}
        <Route path="/community/post/:postId" element={<PostDetails />} />

        {/* 기존 경로 호환성 유지 (필요시) */}
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;