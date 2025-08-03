import { Link, useLocation } from 'react-router-dom';

// 로고 + 네비게이션바 아이콘 이미지 
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';

export default function CampusMapWJ() {
  const location = useLocation();
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

      {/* Main Content Area for Campus Map Page */}
      <main className="mx-4 sm:mx-6 md:mx-10 xl:mx-[100px] mt-8 p-6">

        {/* Two-column layout for Wiki Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar: Campus Navigation */}
          <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-normal text-gray-800 mb-4">Campus Map</h2>
            {/* 구분선 추가 */}
            <hr className="my-4 border-gray-300" />
            <ul className="space-y-2">
              <li>
                {/* 현재 경로가 /map/sujeong과 일치하면 굵게 표시하고, hover 시에도 굵게 (수정된 부분) */}
                <Link 
                  to="/map/soojeong" 
                  className={`block p-2 rounded-md transition-all duration-200 text-gray-800
                    ${location.pathname === "/map/soojeong" ? 'font-semibold' : 'hover:font-semibold'}`}
                >
                  Soojeong Campus
                </Link>
              </li>
              <li>
                {/* 현재 경로가 /map/woonjeong과 일치하면 굵게 표시하고, hover 시에도 굵게 (수정된 부분) */}
                <Link 
                  to="/map/woonjeong" 
                  className={`block p-2 rounded-md transition-all duration-200 text-gray-800
                    ${location.pathname === "/map/woonjeong" ? 'font-semibold' : 'hover:font-semibold'}`}
                >
                  Woonjeong Campus
                </Link>
              </li>
            </ul>
          </aside>

          {/* 운캠 지도  */}
          <section className="w-full md:w-3/4 bg-white rounded-lg shadow-sm overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1579.980550017997!2d127.01895698881943!3d37.62624297204984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbc927f420577%3A0x8b368a3746261b7!2z7ISx7Iug7Jes7J6Q64yA7ZWZ6rWQIOygnOyjvOq1sO2EsA!5e0!3m2!1sko!2skr!4v1722631627885!5m2!1sko!2skr"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sungshin University Woonjeong Campus Map"
            ></iframe>
          </section>
        </div>
      </main>
    </div>
  )};