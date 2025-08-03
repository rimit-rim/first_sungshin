import { Link } from 'react-router-dom';

// Import necessary images (assuming these exist in your assets/images folder)
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png'; // <-- 여기 수정: 공백을 하이픈으로 변경
import MyPageIcon from '../assets/images/Admin Settings Male.png';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-white font-pretendard">
      <header className='sticky top-0 z-50 w-full bg-white
                         py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center
                         xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        
        {/* welcome to sungshin 로고  */}
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
            {/* My Page Link - Active state for My Page */}
            <li className="flex items-center group">
              <Link to="/mypage" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                bg-violet-300 text-black {/* Active state for My Page */}
                group-hover:bg-violet-100 group-hover:text-black
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

      {/* Main Content Area for My Page */}
      {/* Flex container for the two-column layout */}
      <main className="mx-4 sm:mx-6 md:mx-10 xl:mx-[100px] mt-8 p-6 bg-white flex flex-col md:flex-row md:space-x-12">
        {/* Left Section: My Page Title */}
        <div className="md:w-1/3 mb-8 md:mb-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">My Page</h1>
        </div>

        {/* Right Section: Form Fields */}
        <div className="md:w-2/3 space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-800 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Student Verification Status */}
          <div className="flex items-center space-x-3">
            <label htmlFor="verificationStatus" className="text-lg font-medium text-gray-800">Student Verification Status</label>
            <input
              type="checkbox"
              id="verificationStatus"
              className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
          </div>

          {/* Verification Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            If you are not verified, please send a photocopy of enrollment through the email below. You can send us a photocopy of your proof of enrollment or a screenshot of mobile student ID.
          </p>
        </div>
      </main>
    </div>
  )};