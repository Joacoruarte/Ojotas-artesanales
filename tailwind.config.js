/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './Components/**/*.{js,ts,jsx,tsx}',
    './Modals/**/*.{js,ts,jsx,tsx}',
    './Icons/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        primary: '#E3C8AA',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
