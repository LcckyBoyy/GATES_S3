/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: {
        'max-md': { 'max': '767px' },
        'max-lg': { 'max': '1024px' },
        'md': '768px',
      },
    },
  },
  plugins: [],
};
