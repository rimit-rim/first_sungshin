import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import Login from '../Pages/Login';
import MyPage from '../Pages/MyPage';
import SoojeongWiki from '../Pages/SoojeongWiki';
import CampusMapSJ from '../Pages/CampusMapSJ';
import CampusMapWJ from '../Pages/CampusMapWJ';
import CommunityHome from '../Pages/CommunityHome';
import BoardForFreeUse from '../Pages/BoardForFreeUse';
import BoardForQAs from '../Pages/BoardForQ&As';
import BoardForCareer from '../Pages/BoardForCareer';
import BoardForPromo from '../Pages/BoardForPromo';
import Create from '../Pages/Create';
import Post from '../Pages/Post';
import AIChatHome from '../Pages/AIChatHome';
import AIChatInput from '../Pages/AIChatInput';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wiki" element={<SoojeongWiki />} />
        <Route path="/map/soojeong" element={<CampusMapSJ />} />
        <Route path="/map/woonjeong" element={<CampusMapWJ />} />
        <Route path="/chat" element={<AIChatHome />} />
        <Route path="/chat/input" element={<AIChatInput />} />
        <Route path="/community" element={<CommunityHome />} />
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
