/** @type {import('tailwindcss').Config} */
export default {
  content: ['.index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008EE0',
        secondary: '',
        tertiary: '#2E698B',
        quaternary: '#304F61',
        dark: '#8B0000',
        darker: '#2B3033',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, #FFE5E5, #FFCCCC, #FFB3B3, #FF8080)',
      },
      fontFamily: {
        'serif': ['"Times New Roman"', 'Times', 'serif']
      },
    },
  },
  plugins: [],
}

