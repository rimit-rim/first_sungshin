import { Link } from 'react-router-dom';
import axios from "axios";

// 로고 + 네비게이션바 아이콘 이미지 
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';

// 동아리 카드 이미지
import Performance from '../assets/images/Performance.png';
import CommunityService from '../assets/images/CommunityService.png';
import Art from '../assets/images/Art.png';
import Religion from '../assets/images/Religion.png';
import Hobby from '../assets/images/Hobby.png';
import Sports from '../assets/images/Sports.png';
import AcademicStudy from '../assets/images/AcademicStudy.png';

export default function SchoolClubs() {
  return (
    <div className="min-h-screen bg-gray-400 font-pretendard">
      {/* Header Section - Consistent with MyPage */}
      <header className='sticky top-0 z-50 w-full bg-white
                         py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center
                         xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        
        {/* Logo Area - 클릭 시 홈으로 이동 */}
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

        {/* 네비게이션 바 */}
        <nav className="w-full flex justify-center text-gray-800 font-normal
                        xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            {/* SUJEONG-WIKI */}
            <li className="flex items-center group"> 
              <Link to="/wiki" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                bg-violet-300 text-black 
                group-hover:bg-violet-100 group-hover:text-black
                group-focus:bg-purple-300 group-focus:text-white
                text-sm
              ">
                <img src={SoojeongWikiIcon} alt="Bookmark Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> 
                SOOJEONG-WIKI
              </Link>
            </li>
            {/* AI Chat */}
            <li className="flex items-center group">
              <Link to="/chat" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                group-hover:bg-violet-100 group-hover:text-purple-600
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              ">
                <img src={AIChatIcon} alt="AI Chat Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                AI Chat
              </Link>
            </li>
            {/* Community */}
            <li className="flex items-center group">
              <Link to="/community" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                group-hover:bg-violet-100 group-hover:text-purple-600
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              ">
                <img src={CommunityIcon} alt="Community Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                Community
              </Link>
            </li>
            {/* My Page Link */}
            <li className="flex items-center group">
              <Link to="/mypage" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                group-hover:bg-violet-100 group-hover:text-purple-600
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              ">
                <img src={MyPageIcon} alt="My Page Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain"/>
                My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="mx-4 sm:mx-6 md:mx-10 xl:mx-[100px] mt-8 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div
              className="block w-full p-4 rounded-2xl text-center text-lg font-semibold bg-violet-300 text-gray-0"
            >
              School Clubs
            </div>
          </aside>

          <section className="w-full md:w-3/4 bg-violet-100 p-6 rounded-lg shadow-sm min-h-[500px]">
            {/* 동아리 분류 카드*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Performance */}
              <Link to='/schoolclubs/performanceclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {Performance} alt = 'performance 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Performance <br/> Department</p>
              </Link>

              {/* Community Service */}
              <Link to ='/schoolclubs/communityserviceclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {CommunityService} alt = 'communityservice 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Community <br/>Service <br/> Department</p>
              </Link>

              {/* Art */}
              <Link to ='/schoolclubs/artclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {Art} alt = 'performance 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Art Department</p>
              </Link>

              {/* Religion */}
              <Link to ='/schoolclubs/religionclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {Religion} alt = 'religion 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Religion <br/> Department</p>
              </Link>

              {/* Hobby */}
              <Link to ='/schoolclubs/hobbyclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {Hobby} alt = 'hobby 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Hobby <br/> Department</p>
              </Link>

              {/* Sports*/}
              <Link to='/schoolclubs/sportsclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {Sports} alt = 'sports 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Sports <br/> Department</p>
              </Link>

              {/* Academic Study  */}
              <Link to='/schoolclubs/academicstudyclubs' className="bg-white rounded-lg shadow-md p-6 flex items-center text-center transition-transform transform hover:scale-105 cursor-pointer">
                <img src = {AcademicStudy} alt = 'academicstudy 아이콘' className = 'h-20 w-20 mr-4'/>
                <p className="font-semibold text-gray-800 text-xl">Clubs in <br/>Academic Study <br/> Department</p>
              </Link>
          
            </div>
          </section>
        </div>
      </main>
    </div>
  )};