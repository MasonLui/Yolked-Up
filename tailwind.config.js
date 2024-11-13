// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1C1C1E',
        primary: '#0A84FF',
        card: '#2C2C2E',
        darkGray: '#4B5563',
        lightGray: '#9CA3AF',
        whiteText: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
