/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainOrange: '#E75C62',
        activePurple: '#0D276B',
        inactiveGray: '#C4C4C4',
      },
    },
  },
  plugins: [],
}
