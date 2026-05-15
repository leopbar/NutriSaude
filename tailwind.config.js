/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eafaf1',
          100: '#d4f5e3',
          200: '#a9eac8',
          300: '#7ee0ac',
          400: '#52c27c',
          500: '#27ae60',
          600: '#1d8c4d',
          700: '#15703c',
          800: '#0e5430',
          900: '#063820',
        },
      },
      boxShadow: {
        card: '0 2px 14px rgba(0,0,0,0.05)',
        soft: '0 4px 24px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
