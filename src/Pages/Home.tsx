import { Link } from 'react-router-dom';
import axios from "axios";

// 로고+네비게이션바 
import HomeLogo from '../assets/images/HomeLogo.png'; 
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png'; 
import MyPageIcon from '../assets/images/Admin Settings Male.png';

// 카드 아이콘 
import Card1 from '../assets/images/SoojeongWiki.png';
import Card2 from '../assets/images/AIChat.png';
import Card3 from '../assets/images/Community.png';
import LearnMoreIcon from '../assets/images/LearnMore.png';

export default function Home() {
  return (
    
    <div className='min-h-screen bg-white font-pretendard'> 
      <header className='sticky top-0 z-50 w-full bg-white
                         py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center
                         xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        
        {/* 로고 */}
        <div className='mb-4 h-16 w-auto flex-shrink-0
                        xl:absolute xl:top-[50px] xl:left-[100px] xl:w-[727px] xl:h-[105px]'> 
          <img
            src={HomeLogo} 
            alt="Welcome to Sungshin 로고"
            className="w-full h-full object-contain" // 부모 div의 크기에 맞춰짐
          />
        </div>

        {/* 네비게이션 바 */}
        <nav className="w-full flex justify-center text-gray-600 font-normal
                        xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            {/* SOOJEONG-WIKI */}
            <li className="flex items-center group"> 
              <Link to="/wiki" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                group-hover:bg-violet-100 group-hover:text-purple-600
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              "> 
                <img src={SoojeongWikiIcon} alt="Bookmark 아이콘" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> 
                SOOJEONG-WIKI
              </Link>
            </li>
            {/* AI Chat*/}
            <li className="flex items-center group">
              <Link to="/chat" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                group-hover:bg-violet-100 group-hover:text-purple-600
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              "> 
                <img src={AIChatIcon} alt="AI Chat 아이콘" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
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
                <img src={CommunityIcon} alt="Community 아이콘" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                Community
              </Link>
            </li>
            {/* My Page */}
            <li className="flex items-center group">
              <Link to="/mypage" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                group-hover:bg-violet-100 group-hover:text-purple-600
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              "> 
                <img src={MyPageIcon} alt="My Page 아이콘" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* 카드 */}
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 sm:mx-6 md:mx-10 xl:mx-[100px]">
        <Link to = "/wiki" className = "bg-violet-100 p-6 rounded-lg shadow-[0_4px_6px_theme('colors.violet.300')] hover:shadow-[0_8px_12px_theme('colors.violet.300)] shadow-violet-300 transition-shadow duration-300 flex flex-col justify-between w-full h-auto relative hover:bg-violet-300">
          {/* 카드 1 */}
          <div>
            <h2 className="text-3xl font-medium text-gray-0 mb-2">
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">Get Must-have Information</span><br/> 
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">of Sungshin</span> 
            </h2> 
            
            {/* 아이콘 영역 - 반응형 처리 */}
            <div className="flex justify-end mt-4 relative"> 
                <div className="flex items-center justify-center"> 
                    <img src={Card1} alt="SoojeongWiki 아이콘" className="object-contain"/>
                </div>
            </div>
          </div>
          <div className="mt-4 text-gray-0 font-normal text-xl cursor-pointer flex items-center"> 
            <div className="w-11.5 h-11.5 flex items-center justify-center mr-2"> 
                <img src={LearnMoreIcon} alt="Learn More 화살표" className="w-full h-full object-contain" /> 
            </div>
            Learn More 
          </div>
        </Link>

        {/* 카드 2 */}
        <Link to = '/chat' className="bg-violet-100 p-6 rounded-lg shadow-[0_4px_6px_theme('colors.violet.300')] hover:shadow-[0_8px_12px_theme('colors.violet.300)] shadow-violet-300 transition-shadow duration-300 flex flex-col justify-between w-full h-auto relative hover:bg-violet-300"> {/* <-- hover:bg-purple-400 추가 */}
          <div>
            <h2 className="text-3xl font-medium text-gray-0 mb-2">
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">Chat With AI</span><br/> 
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">For Better School Life</span> 
            </h2> 
            
            {/* 아이콘 영역 - 반응형 처리 */}
            <div className="flex justify-end mt-4 relative"> 
                <div className="flex items-center justify-center"> 
                    <img src={Card2} alt="AIChat 아이콘" className="object-contain"/>
                </div>
            </div>
          </div>
          <div className="mt-4 text-gray-0 font-normal text-xl cursor-pointer flex items-center"> 
            <div className="w-11.5 h-11.5 flex items-center justify-center mr-2"> 
                <img src={LearnMoreIcon} alt="Learn More 화살표" className="w-full h-full object-contain" /> 
            </div>
            Learn More 
          </div>
        </Link>


        {/* 3. 카드 3 */}
        <Link to ="/community" className="bg-violet-100 p-6 rounded-lg shadow-[0_4px_6px_theme('colors.violet.300')] hover:shadow-[0_8px_12px_theme('colors.violet.300)] shadow-violet-300 transition-shadow duration-300 flex flex-col justify-between w-full h-auto relative hover:bg-violet-300"> {/* <-- hover:bg-purple-400 추가 */}
          <div>
            <h2 className="text-3xl font-medium text-gray-0 mb-2">
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">Communication With</span><br/> 
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">Other Students</span> 
            </h2> 
            
            {/* 아이콘 영역 - 반응형 처리 */}
            <div className="flex justify-end mt-4 relative"> 
                <div className="flex items-center justify-center"> 
                    <img src={Card3} alt="Communication 아이콘" className="object-contain"/>
                </div>
            </div>
          </div>
          <div className="mt-4 text-gray-0 font-normal text-xl cursor-pointer flex items-center"> 
            <div className="w-11.5 h-11.5 flex items-center justify-center mr-2"> 
                <img src={LearnMoreIcon} alt="Learn More 화살표" className="w-full h-full object-contain" /> 
            </div>
            Learn More 
          </div>
        </Link>


        {/* 3. 카드 4 */}
        <Link to ="/mypage" className="bg-violet-100 p-6 rounded-lg shadow-[0_4px_6px_theme('colors.violet.300')] hover:shadow-[0_8px_12px_theme('colors.violet.300)] shadow-violet-300 transition-shadow duration-300 flex flex-col justify-between w-full h-auto relative hover:bg-violet-300"> {/* <-- hover:bg-purple-400 추가 */}
          <div>
            <h2 className="text-3xl font-medium text-gray-0 mb-2">
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">Get verified,</span><br/> 
              <span className="inline-block bg-indigo-200 px-1 py-0.5 rounded">Get access tp those features.</span> 
            </h2> 
            
            {/* 아이콘 영역 - 반응형 처리 */}
          </div>
          <div className="mt-4 text-gray-0 font-normal text-xl cursor-pointer flex items-center"> 
            <div className="w-11.5 h-11.5 flex items-center justify-center mr-2"> 
                <img src={LearnMoreIcon} alt="Learn More 화살표" className="w-full h-full object-contain" /> 
            </div>
            Learn More 
          </div>
        </Link>
      </main>
    </div>
  );
}