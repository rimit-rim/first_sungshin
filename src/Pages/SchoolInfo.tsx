import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Papa from 'papaparse';

// 로고+네비+뒤로가기
import HomeLogo from '../assets/images/HomeLogo.png';
import SoojeongWikiIcon from '../assets/images/Bookmark.png';
import AIChatIcon from '../assets/images/Chat.png';
import CommunityIcon from '../assets/images/Collaborating In Circle.png';
import MyPageIcon from '../assets/images/Admin Settings Male.png';
import BackButton from '../assets/images/Back.png';

// 캘린더 이벤트 데이터 타입
interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    description: string;
  };
}

// 카테고리별 색상 맵 
const categoryColors: { [key: string]: { bg: string; text: string } } = {
  신청및등록: { bg: '#E5DFFD', text: '#8A5AF5' }, // violet-100, violet-500
  학적및수업: { bg: '#E0E0FC', text: '#8285F5' }, // indigo-100, indigo-400
  성적및평가: { bg: '#F6D9FD', text: '#C362F4' }, // purple-100, purple-400
  Default: { bg: '#F1F1F2', text: '#000000' },      // gray-400, gray-0
};


const getCategoryFromEvent = (eventTitle: string): string => {
  if (eventTitle.includes('신청') || eventTitle.includes('등록')) return '신청및등록';
  if (eventTitle.includes('성적') || eventTitle.includes('평가')) return '성적및평가';
  if (eventTitle.includes('강의') || eventTitle.includes('휴학') || eventTitle.includes('복학') || eventTitle.includes('계절수업') || eventTitle.includes('종강') || eventTitle.includes('학위수여')) return '학적및수업';
  return 'Default';
};



export default function SchoolInfo() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const fetchAndParseCsv = async () => {
      try {
        const response = await fetch('/sungshin_calendar_2025_2nd_semester.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedEvents = results.data.map((row: any) => {
              const category = getCategoryFromEvent(row.event);
              const colors = categoryColors[category] || categoryColors.Default;
              const endDate = new Date(row.end_date);
              endDate.setDate(endDate.getDate() + 1);

              return {
                title: row.event,
                start: row.start_date,
                end: endDate.toISOString().split('T')[0],
                backgroundColor: colors.bg,
                borderColor: colors.bg,
                textColor: colors.text,
                extendedProps: { description: row.event },
              };
            });
            setEvents(parsedEvents);
          },
        });
      } catch (error) {
        console.error("CSV 파일을 불러오거나 파싱하는 중 오류가 발생했습니다:", error);
      }
    };
    fetchAndParseCsv();
  }, []);

  const handleDateClick = (arg: any) => {
    calendarRef.current?.getApi().changeView('dayGridWeek', arg.dateStr);
  };

  const handleEventClick = (clickInfo: any) => {
    const { title, extendedProps } = clickInfo.event;
    alert(`[${title}]\n\n상세 내용: ${extendedProps.description}`);
  };

  return (
    <div className="min-h-screen bg-white font-pretendard">
      {/* css*/}
      <style>{`
        .fc-event { cursor: pointer; }
        .fc { border: none; }
        .fc .fc-toolbar.fc-header-toolbar { 
          margin-bottom: 1.5rem; 
          color: #000000; /* gray-0 */
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .fc .fc-toolbar-chunk {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .fc .fc-toolbar-title { font-size: 1.5rem; font-weight: 700; }
        
        .fc .fc-button { 
          background-color: #F1F1F2; /* gray-400 */
          border: 1px solid #E5E5EA; /* gray-300 */
          color: #000000; /* gray-0 */
          padding: 0.5rem 1rem;
          text-transform: capitalize;
          font-weight: 500;
          background-image: none;
        }
        .fc .fc-button:hover {
          background-color: #E5E5EA; /* gray-300 */
        }
        
        .fc .fc-button-primary:not(:disabled).fc-button-active, 
        .fc .fc-button-primary:not(:disabled):active {
          background-color: #8A5AF5; /* violet-500 */
          border-color: #8A5AF5; /* violet-500 */
          color: #FFFFFF; /* gray-500 */
        }

        .fc .fc-prev-button,
        .fc .fc-next-button {
          background-color: transparent;
          border: none;
        }
        .fc .fc-prev-button .fc-icon,
        .fc .fc-next-button .fc-icon {
          font-size: 1.5rem;
        }

        .fc .fc-daygrid-day-header { border: none; padding-bottom: 0.5rem; font-weight: 500; color: #000000; /* gray-0 */ }
        .fc .fc-daygrid-day { border: none; }
        .fc .fc-daygrid-day-frame { padding: 4px; }
        .fc .fc-day-today { background-color: #F1F1F2 !important; /* gray-400 */ border-radius: 0.75rem; }
        .fc .fc-daygrid-day-number { padding: 0.5rem; font-size: 0.875rem; }
        .fc .fc-daygrid-event { border-radius: 0.375rem; padding: 2px 6px; font-weight: 500; font-size: 0.8rem; margin-bottom: 4px; }
      `}</style>

     
      <header className='sticky top-0 z-50 w-full bg-white
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
          <Link to="/wiki">
            <img src={BackButton} alt="Back to School Clubs" className="h-8 w-8 object-contain" />
          </Link>
        </div>  

        <nav className="w-full flex justify-center text-gray-600 font-normal
                        xl:absolute xl:top-[178px] xl:right-[100px] xl:w-[783px] xl:h-[50px] xl:flex xl:items-center xl:justify-end"> 
          <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-[21px]">
          <li className="flex items-center group">
              <Link to="/wiki" className="
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                bg-violet-300 text-black 
                group-hover:bg-violet-100 group-hover:text-black
                group-focus:bg-purple-400 group-focus:text-white
                text-sm
              ">
                <img src={SoojeongWikiIcon} alt="Soojeon Wiki Icon" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 object-contain" />
                SOOJEONG-WIKI
              </Link>
            </li>
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

      <main className="p-4 sm:p-6 md:p-10 my-8 max-w-7xl mx-auto">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,today'
          }}
          buttonText={{
              dayGridMonth: 'Month',
              dayGridWeek: 'Week',
              today: 'Today'
          }}
          height="auto"
          dayHeaderFormat={{ weekday: 'short' }}
        />
      </main>
    </div>
  );

}