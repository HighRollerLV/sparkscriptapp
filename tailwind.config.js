/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,index}.tsx",
    "./{components,pages,hooks,contexts,services,utils,data}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFBE00',
        'background': '#14171A',
        'surface': '#22272B',
        'border': '#33383D', // A slightly lighter border for better contrast on surface elements
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}