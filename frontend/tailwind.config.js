/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sepia: {
          50: '#fbf0d9',
          100: '#f7e4be',
          200: '#f0ce8c',
          800: '#5c4015',
          900: '#3e2b0e',
        }
      }
    },
  },
  plugins: [],
}
