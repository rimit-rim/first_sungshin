import { Link , useLocation} from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import axios from "axios";

// 로고 + 네비게이션바 아이콘 이미지 
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function CampusMapSJ() {
  const location = useLocation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      if (mapContainerRef.current) {
        //수캠 위/경도
        const initialCoords = { lat: 37.591193, lng: 127.022851 };
        const initialCenter = new window.kakao.maps.LatLng(initialCoords.lat, initialCoords.lng);

        const options = {
          center: initialCenter,
          level: 3, 
        };

        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
        mapInstanceRef.current = map;
        
        const marker = new window.kakao.maps.Marker({
          position: initialCenter,
        });
        marker.setMap(map);

        // 맵 위치 조정
        setTimeout(() => {
          map.relayout();
          map.setCenter(initialCenter);
        }, 0);
      }
    });
  }, []);

  
  useEffect(() => {
    if (mapInstanceRef.current) {
      // 수캠, 운캠 위/경도
      const soojeongCoords = { lat: 37.591193, lng: 127.022851 };
      const woonjeongCoords = { lat: 37.631949, lng: 127.027352 };

      const currentCoords = location.pathname.includes('woonjeong')
        ? woonjeongCoords
        : soojeongCoords;
      
      const moveLatLon = new window.kakao.maps.LatLng(currentCoords.lat, currentCoords.lng);
      
      mapInstanceRef.current.relayout();
      mapInstanceRef.current.panTo(moveLatLon);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-400 font-pretendard">
      <header className='sticky top-0 z-50 w-full bg-white py-4 px-4 sm:px-6 md:px-10 flex flex-col items-center xl:relative xl:h-[250px] xl:block xl:px-0 xl:py-0'> 
        <div className='mb-4 h-16 w-auto flex-shrink-0 xl:absolute xl:top-[50px] xl:left-[100px] xl:w-[727px] xl:h-[105px]'> 
          <Link to="/home"><img src={HomeLogo} alt="Welcome to Sungshin Logo" className="w-full h-full object-contain" /></Link>
        </div>
        <nav className="w-full flex justify-center text-gray-600 font-normal xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
            <li className="flex items-center group"> 
              <Link to="/wiki" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 bg-violet-300 text-black text-sm group-hover:bg-violet-100 group-hover:text-black group-focus:bg-purple-400 group-focus:text-white">
                <img src={SoojeongWikiIcon} alt="Bookmark Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> SOOJEONG-WIKI
              </Link>
            </li>
            <li className="flex items-center group">
              <Link to="/chat" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-sm group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white">
                <img src={AIChatIcon} alt="AI Chat Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> AI Chat
              </Link>
            </li>
            <li className="flex items-center group">
              <Link to="/community" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-sm group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white">
                <img src={CommunityIcon} alt="Community Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> Community
              </Link>
            </li>
            <li className="flex items-center group">
              <Link to="/mypage" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-sm group-hover:bg-violet-100 group-hover:text-purple-600 group-focus:bg-purple-400 group-focus:text-white">
                <img src={MyPageIcon} alt="My Page Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" /> My Page
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-4 sm:mx-6 md:mx-10 xl:mx-[100px] mt-8 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-normal text-gray-800 mb-4">Campus Map</h2>
            <hr className="my-4 border-gray-300" />
            <ul className="space-y-2">
              <li>
                <Link to="/map/soojeong" className={`block p-2 rounded-md transition-all duration-200 text-gray-800 ${location.pathname.includes("/soojeong") ? 'font-semibold' : 'hover:font-semibold'}`}>
                  Soojeong Campus
                </Link>
              </li>
              <li>
                <Link to="/map/woonjeong" className={`block p-2 rounded-md transition-all duration-200 text-gray-800 ${location.pathname.includes("/woonjeong") ? 'font-semibold' : 'hover:font-semibold'}`}>
                  Woonjeong Campus
                </Link>
              </li>
            </ul>
          </aside>
          <section className="w-full md:w-3/4 bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          </section>
        </div>
      </main>
    </div>
  );
}