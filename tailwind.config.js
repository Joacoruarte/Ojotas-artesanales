/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        'primary': '#E3C8AA',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
