/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0b0b0f',
        accent: '#7a40ed',
        'accent-strong': '#8f5cf5'
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
