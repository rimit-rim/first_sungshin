import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import LandingPage from '../Pages/LandingPage';
import Login from '../Pages/Login';
import MyPage from '../Pages/MyPage';
import SoojeongWiki from '../Pages/SoojeongWiki';
import SchoolClubs from '../Pages/SchoolClubs';
import PerformanceClubs from '../Pages/PerformanceClubs';
import ReligionClubs from '../Pages/ReligionClubs';
import ArtClubs from '../Pages/ArtClubs';
import HobbyClubs from '../Pages/HobbyClubs';
import SportsClubs from '../Pages/SportsClubs';
import CommunityServiceClubs from '../Pages/CommunityServiceClubs';
import AcademicStudyClubs from '../Pages/AcademicStudyClubs';
import CampusMapSJ from '../Pages/CampusMapSJ';
import CampusMapWJ from '../Pages/CampusMapWJ';
import SchoolInfo from '../Pages/SchoolInfo';
import CommunityHome from '../Pages/CommunityHome';
import BoardForFreeUse from '../Pages/BoardForFreeUse';
import BoardForQAs from '../Pages/BoardForQ&As';
import BoardForCareer from '../Pages/BoardForCareer';
import BoardForPromo from '../Pages/BoardForPromo';
import Create from '../Pages/Create';
import Post from '../Pages/Post';
import AIChatHome from '../Pages/AIChatHome';
import AIChatInput from '../Pages/AIChatInput';
import CommunityBoards from '../Pages/CommunityBoards';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<CommunityHome />} />
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
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/communityboards" element={<CommunityBoards/>}/>
        <Route path="/community/free" element={<BoardForFreeUse />} />
        <Route path="/community/qna" element={<BoardForQAs />} />
        <Route path="/community/career" element={<BoardForCareer />} />
        <Route path="/community/promo" element={<BoardForPromo />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}