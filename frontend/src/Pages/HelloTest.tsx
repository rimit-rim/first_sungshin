// <div className="bg-red-500 text-white p-4">Tailwind Test</div>

import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const HelloTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/hello')
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        console.error('API 호출 실패:', err);
      });
  }, []);

  return (
    <div className="p-4 text-xl">
      백엔드 응답: {message || '로딩 중...'}
    </div>
  );
};

export default HelloTest;