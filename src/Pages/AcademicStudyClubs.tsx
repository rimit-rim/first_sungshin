import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';

// 로고+네비+뒤로가기
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';
import BackButton from '../assets/images/Back.png';


// 동아리 데이터 타입 
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
  'Art': [],
  'Religion': [],
  'Hobby': [],
  'Sports': [],
  'Academic Study': [
  { 
    name: 'UNSA', 
    description: 'Sungshin Branch of United Nations Students Association', 
    subDescription: "UN Korea and Sustainable Development Goals activites, Model UN", 
    instagram: 'https://www.instagram.com/sungshin_unsa/' },
  { 
    name: 'S.Fin', 
    description: 'Sungshin Finance Research Club', 
    subDescription: "Learning Finacnce theories, Discussion and presentation on Economic issues", 
    instagram: 'https://www.instagram.com/sswu_sfin/' },
  { 
    name: 'Todallae', 
    description: 'Debating Club', 
    subDescription: "Korea University Students Debating Competition participation", 
    instagram: 'https://www.instagram.com/todallae/' },
  { 
    name: 'Magi', 
    description: 'Enterpreneurship Club', 
    subDescription: "Various competitions participation, United workshop with other schools participarion", 
    instagram: 'https://www.instagram.com/sungshin_magi/' },
  { 
    name: 'S.C.C', 
    description: 'Sungshin Computuer Club', 
    subDescription: "Computer study activites, Computer-related licenses study", 
    instagram: 'https://www.instagram.com/sungshin_s.c.c/' },
  { 
    name: 'US', 
    description: 'International Students Networking Clib', 
    subDescription: "Product Design & Manufacture & Sale experience, Product exhibition", 
    instagram: 'https://www.instagram.com/us_sswuus/' },
  { 
    name: 'GPS', 
    description: 'Feminism Study Club', 
    subDescription: "Learning Feminism, Promoting Women's rights", 
    instagram: 'https://www.instagram.com/sswu_gps/' },
  { 
    name: 'LAICOS Sungshin', 
    description: 'Sungshin Branch of LAICOS', 
    subDescription: "Reflection of'SOCIAL', Innovative business model design", 
    instagram: 'https://www.instagram.com/laicos_sswu/' },
  { 
    name: 'Radsbos', 
    description: 'Lesbianism Study CLub', 
    subDescription: "Lesbian, Feminsm projects and activities, Regular issue of publications", 
    instagram: 'https://www.instagram.com/radsbos/' },
  { 
    name: 'Dear.Sisters', 
    description: 'Feminism Book and Discussion Club', 
    subDescription: "Regular meeting/debating on deminism books and films, Feminism or book related campaigns", 
    instagram: 'https://www.instagram.com/dearsisters_sungshin/' },
  { 
    name: 'S-CRYPTO', 
    description: 'Encryption and Blockchain Research Club', 
    subDescription: "Learning theories programming ways of encryption and blockchain, Encryption competition participation, Academic paper presentation", 
    instagram: 'https://www.instagram.com/s_crypto_/' },
  { 
    name: 'UMC SSWU', 
    description: 'Sunshin Branch of University Makeus Challenge', 
    subDescription: "App development and launching", 
    instagram: 'https://www.instagram.com/sswu_makeus_challenge/' },
  { 
    name: 'ToI', 
    description: 'Try Our Ideal', 
    subDescription: "Patent analysis and invention, Technology development", 
    instagram: 'https://www.instagram.com/sungshin_toi/' },
  { 
    name: 'DejaVu', 
    description: 'Statistic and Data Analysis Club', 
    subDescription: "Data competition participation, Data-related conference participation, Data analyzing", 
    instagram: 'https://www.instagram.com/sswu_dajavu/' },
  { 
    name: 'S.GAM', 
    description: 'Game Development/Production Club', 
    subDescription: "Game development and production studies, Game project", 
    instagram: 'https://www.instagram.com/sswu_s.gam/' },
  { 
    name: 'Like Lion', 
    description: 'Sungshin Branch of Like Lion', 
    subDescription: "Information Technology entrepreneurship club, Software development", 
    instagram: 'https://www.instagram.com/likelion_sswu/' },
  ],

};

// 사이드바 링크 
const sidebarLinks = [
    { name: 'Performance', path: '/schoolclubs/performanceclubs' },
    { name: 'Community Service', path: '/schoolclubs/communityserviceclubs' }, 
    { name: 'Art', path: '/schoolclubs/artclubs' },
    { name: 'Religion', path: '/schoolclubs/religionclubs' },
    { name: 'Hobby', path: '/schoolclubs/hobbyclubs' },
    { name: 'Sports', path: '/schoolclubs/sportsclubs' },
    { name: 'Academic Study', path: '/schoolclubs/academicstudyclubs' },
];


// 각 동아리 정보  카드 
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

// 사이드바 네비
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
            <button onClick={onClose}><X size={24} /></button>
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


export default function AcademicStudyClubs() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const clubsToShow = allClubs['Academic Study']; 

  return (
    <div className="min-h-screen bg-white font-pretendard">

      <header className='sticky top-0 z-20 w-full bg-white
                         py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center
                         xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        
        <div className='mb-4 h-16 w-auto flex-shrink-0
                        xl:absolute xl:top-[50px] xl:left-[100px] xl:w-[727px] xl:h-[105px]'> 
          <Link to="/">
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
              <Link to="/communityboards" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white text-sm">
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
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <span className="ml-2 font-bold text-lg">School Clubs</span>
          </div>
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <section className="w-full md:w-3/4 bg-violet-100 p-4 sm:p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Clubs in Academic Study Department</h2>
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
  );
}