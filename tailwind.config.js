/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif']
      }
    }
  },
  plugins: []
}
