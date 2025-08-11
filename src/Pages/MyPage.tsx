import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// 로고+네비 
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';

// 학생 정보 데이터 타입 
interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  verification: number; // 0: 미인증사용자, 1 or 2: 인증사용자
  createdAt: string;
}
export default function MyPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 구글 로그인 정보가 있으면 먼저 사용
        const googleInfo = localStorage.getItem('googleUserInfo');
        if (googleInfo) {
          const parsed = JSON.parse(googleInfo);
          setUser({
            id: parsed.id || 0,
            nickname: parsed.name || parsed.nickname,
            email: parsed.email,
            verification: parsed.verification || 0,
            createdAt: parsed.createdAt || new Date().toISOString()
          });
          setLoading(false);
          return;
        }
  
        // 구글 정보가 없으면 기존 API 호출
        const token = localStorage.getItem('token');
        const response = await axios.get<UserInfo>('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user information.');
        console.error('Failed to load user information:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div className="p-10 text-center">loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!user) return <div className="p-10 text-center">Could not find user information.</div>;

  const isVerified = user.verification === 1 || user.verification === 2;

  return (
    <div className="min-h-screen font-pretendard">
      
      <header className='sticky top-0 z-50 w-full bg-white py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        <div className='mb-4 h-16 w-auto flex-shrink-0 xl:absolute xl:top-[50px] xl:left-[100px] xl:w-[727px] xl:h-[105px]'>
          <Link to="/home">
            <img
              src={HomeLogo} 
              alt="Welcome to Sungshin Logo"
              className="w-full h-full object-contain" 
            />
          </Link>
        </div>
        <nav className="w-full flex justify-center text-gray-600 font-normal xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            <li className="flex items-center group"> 
              <Link to="/wiki" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white text-sm">
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
              <Link to="/mypage" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 bg-violet-300 text-black group-hover:bg-violet-100 group-hover:text-black group-focus:bg-purple-400 group-focus:text-white text-sm">
                <img src={MyPageIcon} alt="My Page Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 마이페이지*/}
      <main className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">My Page</h1>
        
        <div className="space-y-6">
          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <div className="w-full p-3 text-lg border border-gray-200 rounded-md bg-gray-50 select-text">
              {user.nickname}
            </div>
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="w-full p-3 text-lg border border-gray-200 rounded-md bg-gray-50 select-text">
              {user.email}
            </div>
          </div>

          {/* 학생 인증 상태 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Student Verification Status</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                disabled
                checked={isVerified}
              />
              <span className={`text-lg  ${isVerified ? 'text-violet-600' : 'text-red-600 font-normal'}`}>
                {isVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 pt-2 border-t mt-6">
            If you are not verified, please send a certificate of enrollment through the email below.
            <br></br>You can send us a photocopy of your proof of enrollment or a screenshot of your mobile student ID.
          </p>
        </div>
      </main>
    </div>
  );
}