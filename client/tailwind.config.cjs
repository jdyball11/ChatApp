/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightWhite: '#fafafa',
        materialBlack: '#121212',
        dcBlue: '#7289da'
      },
      gridTemplateRows: {
        'chatLayout': '72px 1fr auto',
        'sideBarLayout': '72px auto 1fr'
      }
    },
  },
  plugins: [],
}