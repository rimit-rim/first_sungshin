import { Link } from 'react-router-dom';

// 로고 + 네비게이션바 아이콘 이미지 
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';

// Wiki 페이지 아이콘 이미지
import CampusMapImage from '../assets/images/CampusMap.png';
import SchoolClubsImage from '../assets/images/Clubs.png'; 
import SchoolInfoImage from '../assets/images/SchoolCalendar.png'; 
import LearnMore from '../assets/images/LearnMore.png';

export default function SoojeongWiki() {
  return (
    <div className="min-h-screen bg-white font-pretendard">
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
        <nav className="w-full flex justify-center text-gray-600 font-normal
                        xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            {/* SUJEONG-WIKI */}
            <li className="flex items-center group"> 
              <Link to="/wiki" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                bg-violet-300 text-black {/* Active state for Wiki */}
                group-hover:bg-violet-100 group-hover:text-black
                group-focus:bg-purple-400 group-focus:text-white
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
              <Link to="/communityboards" className="
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
                <img src={MyPageIcon} alt="My Page Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Area for Wiki Page */}
      <main className="mx-4 sm:mx-6 md:mx-10 xl:mx-[100px] mt-8 p-6">

        {/* Wiki Content Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Campus Map Card */}
          <Link to="/map/soojeong" className="
            bg-violet-50 p-6 rounded-lg shadow-sm flex flex-col justify-between h-[250px]
            transition-colors duration-200 hover:bg-violet-300
          ">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Campus Map</h2>
              <p className="text-gray-600 text-sm mb-4">Sujeong & Wonjeong Campus</p>
              <div className="flex justify-center items-center h-[100px] mb-4">
                <img src={CampusMapImage} alt="Campus Map" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
            {/* 변경: 하위 Learn More 링크를 div로 변경 */}
            <div className="flex items-center text-gray-800">
              <img src={LearnMore} alt="Learn more" className="h-5 w-5 mr-1"/>
              Learn More
            </div>
          </Link>

         {/* School Clubs Card */}
          {/* 변경: div를 Link 컴포넌트로 감싸고, hover 효과 클래스 추가 */}
          <Link to="/clubs" className="
            bg-violet-50 p-6 rounded-lg shadow-sm flex flex-col justify-between h-[250px]
            transition-colors duration-200 hover:bg-violet-300
          ">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">School Clubs</h2>
              <p className="text-gray-600 text-sm mb-4">Explore various clubs for more enjoyable school life</p>
              <div className="flex justify-center items-center h-[100px] mb-4">
                <img src={SchoolClubsImage} alt="School Clubs" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
            {/* 변경: 하위 Learn More 링크를 div로 변경 */}
            <div className="flex items-center text-gray-800">
              <img src={LearnMore} alt="Learn more" className="h-5 w-5 mr-1"/>
              Learn More
            </div>
          </Link>


          {/* School Information Card */}
          {/* 변경: div를 Link 컴포넌트로 감싸고, hover 효과 클래스 추가 */}
          <Link to="/schoolinfo" className="
            bg-violet-50 p-6 rounded-lg shadow-sm flex flex-col justify-between h-[250px]
            transition-colors duration-200 hover:bg-violet-300
          ">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">School Information</h2>
              <p className="text-gray-600 text-sm mb-4">Academic Calendar, Key Deadlines</p>
              <div className="flex justify-center items-center h-[100px] mb-4">
                {SchoolInfoImage && <img src={SchoolInfoImage} alt="School Information" className="max-h-full max-w-full object-contain" />}
              </div>
            </div>
            {/* 변경: 하위 Learn More 링크를 div로 변경 */}
            <div className="flex items-center text-gray-800">
              <img src={LearnMore} alt="Learn more" className="h-5 w-5 mr-1"/>
              Learn More
            </div>
          </Link>

        </div>
      </main>
    </div>
  )};