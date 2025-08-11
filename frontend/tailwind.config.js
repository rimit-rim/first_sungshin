/** @type {import('tailwindcss').Config} */
import {defineConfig} from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        violet: {
          100: '#E5DFFD',
          200: '#CEC1FC',
          300: '#B6A1FA',
          400: '#9F7FF8',
          500: '#8A5AF5',
        },
        indigo: {
          100: '#E0E0FC',
          200: '#C1C2FA',
          300: '#A2A3F8',
          400: '#8285F5',
        },
        purple: {
          100: '#F6D9FD',
          200: '#EEADFA',
          300: '#E780F8',
          400: '#C362F4',
        },
        gray: {
          0: '#000000',
          100: '#AEAEB2',
          200: '#D6D6D8',
          300: '#E5E5EA',
          400: '#F1F1F2',
          500: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}