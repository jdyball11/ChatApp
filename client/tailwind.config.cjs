/** @type {import('tailwindcss').Config} */
module.exports = {
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
        'chatLayout': '200px 1fr 200px'
      }
    },
  },
  plugins: [],
}