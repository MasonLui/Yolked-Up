// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
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
