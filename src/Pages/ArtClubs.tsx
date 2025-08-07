import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import axios from "axios";

// --- 헤더에 사용되는 이미지 임포트 (사용자 코드 유지) ---
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';
import BackButton from '../assets/images/Back.png';


// 클럽 데이터 타입 정의
interface Club {
  name: string;
  description: string;
  instagram: string;
  subDescription: string;
}

// 전체 동아리 데이터 
const allClubs: { [key: string]: Club[] } = {
  'Performance': [],
  'Community Service': [],
  'Art': [
    { name: 'Sungshin Seo-Doh-Hwae', 
      description: 'Sungshin SDH(Seo-Doh-Hwae)', 
      subDescription: "Traditional Calligraphy Club", 
      instagram: 'https://www.instagram.com/sswu_sdh/' },
      { name: "S'angle", 
      description: 'Photography Club', 
      subDescription: "Photography exhibition & Short regular photo trips", 
      instagram: 'https://www.instagram.com/sswu_s_angle/' },
      { name: "Studio Overpower", 
      description: 'Art Project Club', 
      subDescription: " ", 
      instagram: 'https://www.instagram.com/studiooverpower/' },
      { name: "Chan-bit", 
      description: 'Film Photography Club', 
      subDescription: " Runs photography exhibition and has short regular photo trips", 
      instagram: 'https://www.instagram.com/chan_bitt/' },
      { name: "LE-D(LEAD)", 
      description: 'Cultural Arts Projects Club', 
      subDescription: " ", 
      instagram: 'https://www.instagram.com/sswu_led/' }
  ],
  'Religion': [],
  'Hobby': [],
  'Sports': [],
  'Academic Study': [],
};

// 사이드바 링크
const sidebarLinks = [
    { name: 'Performance', path: '/schoolclubs/performanceclubs' },
    { name: 'Community Service', path: '/schoolclubs/communityserviceclubs' }, // <-- 띄어쓰기 추가
    { name: 'Art', path: '/schoolclubs/artclubs' },
    { name: 'Religion', path: '/schoolclubs/religionclubs' },
    { name: 'Hobby', path: '/schoolclubs/hobbyclubs' },
    { name: 'Sports', path: '/schoolclubs/sportsclubs' },
    { name: 'Academic Study', path: '/schoolclubs/academicstudyclubs' },
];


// 각 동아리 정보 카드
const ClubCard: React.FC<{ club: Club }> = ({ club }) => (
    <div className="flex flex-col sm:flex-row items-center w-full">
      <div className="bg-white w-40 h-28 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
        <div className="flex items-center justify-center h-full">
          <span className="font-semibold text-gray-700 text-2xl text-center leading-tight">{club.name.split(' ')[0]} <br /> {club.name.split(' ').slice(1).join(' ')}</span>
        </div>
      </div>
      
      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-semibold text-xl text-gray-800">{club.description}</h3>
        {club.subDescription && ( 
          <p className = "text-normal text-gray-600 mt-1">{club.subDescription}</p>
        )}
        <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center justify-center sm:justify-start mt-2 break-all">
          <Instagram size={16} className="mr-2 flex-shrink-0" />
          <span>{club.instagram}</span>
        </a>
      </div>
    </div>
);

// 사이드바 네비게이션 
const Sidebar: React.FC<{ 
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      <nav className={`fixed top-0 left-0 h-full bg-white w-64 md:w-1/4 md:relative md:bg-transparent md:h-auto md:pr-8 flex-shrink-0 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 md:p-0">
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="font-bold text-lg">Categories</h2>
            <button type="button" title="Close" onClick={onClose}><X size={24} /></button>
          </div>
          <div className="bg-violet-300 text-gray-800 py-3 px-4 rounded-xl mb-4 text-center">
            <h2 className="font-bold text-lg">School Clubs</h2>
          </div>
          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `w-full block text-left py-2 px-4 rounded-md transition-colors duration-200 text-base ${
                      isActive
                        ? 'text-gray-800 font-extrabold'
                        : 'text-gray-600 hover:text-gray-800 hover:font-bold'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

// --- 메인 페이지 컴포넌트 ---
export default function ArtClubs() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // 이 페이지는 봉사 동아리만 보여주므로, 데이터를 직접 지정합니다.
  const clubsToShow = allClubs['Art']; // <-- 키가 일치하므로 정상 작동

  return (
    <div className="min-h-screen bg-white font-pretendard">
      {/* Header Section - 사용자 코드 유지 */}
      <header className='sticky top-0 z-20 w-full bg-white
                         py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center
                         xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        
        <div className='mb-4 h-16 w-auto flex-shrink-0
                        xl:absolute xl:top-[50px] xl:left-[100px] xl:w-[727px] xl:h-[105px]'> 
          <Link to="/home">
            <img
              src={HomeLogo} 
              alt="Welcome to Sungshin Logo"
              className="w-full h-full object-contain" 
            />
          </Link>
        </div>

        <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10
                        xl:absolute xl:top-[178px] xl:left-[100px] xl:right-[100px]">
          <Link to="/clubs">
            <img src={BackButton} alt="Back to School Clubs" className="h-8 w-8 object-contain" />
          </Link>
        </div>  
         <nav className="w-full flex justify-center text-gray-600 font-normal
                        xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            <li className="flex items-center group"> 
              <Link to="/wiki" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 bg-violet-300 text-black group-hover:bg-violet-100 group-hover:text-black group-focus:bg-purple-400 group-focus:text-white text-sm">
                <img src={SoojeongWikiIcon} alt="Bookmark Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> 
                SOOJEONG-WIKI
              </Link>
            </li>
            <li className="flex items-center group">
              <Link to="/chat" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white text-sm">
                <img src={AIChatIcon} alt="AI Chat Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                AI Chat
              </Link>
            </li>
            <li className="flex items-center group">
              <Link to="/community" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white text-sm">
                <img src={CommunityIcon} alt="Community Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                Community
              </Link>
            </li>
            <li className="flex items-center group">
              <Link to="/mypage" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white text-sm">
                <img src={MyPageIcon} alt="My Page Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="px-4 sm:px-6 md:px-10 xl:px-[100px] my-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:hidden flex items-center mb-4">
            <button type="button" title="Open" onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <span className="ml-2 font-bold text-lg">School Clubs</span>
          </div>
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <section className="w-full md:w-3/4 bg-violet-100 p-4 sm:p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Clubs in Art Department</h2>
            {clubsToShow.length > 0 ? (
              <div className="space-y-4">
                {clubsToShow.map((club) => (
                  <ClubCard key={club.name} club={club} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                <p>이 카테고리에는 아직 동아리가 없습니다.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )};