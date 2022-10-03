/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      xxl: '1440px',
    }
  },
  plugins: [],
}
