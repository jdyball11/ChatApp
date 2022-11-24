/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      },
      boxShadow: {
        'darkRounded': '0 0 25px rgba(239, 245, 245, 0.100)',
        'lightRounded': '0 0 18px rgba(239, 245, 245, 0.800)',
      }
    },
  },
  plugins: [],
}