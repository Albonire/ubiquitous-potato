/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'studio-off-white': '#f2f1f3',
        'pure-white': '#ffffff',
        'hairline-gray': '#e5e4e7',
        'soft-mist': '#97979b',
        'slate': '#6e6e73',
        'ink': '#19171c',
        'pure-black': '#000000',
        'eclipse-violet': '#7a40ed',
        'deep-plum': '#17082c',
        'lilac-wash': '#a981ff',
        'lavender-mist': '#cab3f8',
        'electric-blue': '#00b2ff',
        'sky-tint': '#e6f4ff',
        'ice-blue': '#a9dbff',
        'volt': '#f5ff63',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '40px',
        'badge': '40px',
        'input': '26px',
        'button': '50px',
        'nav': '20px',
      },
      boxShadow: {
        'jitter-xl': 'rgba(25, 23, 28, 0.01) 0px 152px 61px 0px, rgba(25, 23, 28, 0.05) 0px 85px 51px 0px, rgba(25, 23, 28, 0.09) 0px 38px 38px 0px, rgba(25, 23, 28, 0.1) 0px 9px 21px 0px',
        'jitter-xl-2': 'rgba(0, 0, 0, 0.01) 0px 63px 25px 0px, rgba(0, 0, 0, 0.05) 0px 35px 21px 0px, rgba(0, 0, 0, 0.09) 0px 16px 16px 0px, rgba(0, 0, 0, 0.1) 0px 4px 9px 0px',
        'jitter-card': '0 20px 45px -12px rgba(25, 23, 28, 0.08), 0 0 1px 1px rgba(25, 23, 28, 0.04)',
        'jitter-hover': '0 28px 55px -12px rgba(122, 64, 237, 0.16), 0 0 1px 1px rgba(122, 64, 237, 0.1)',
        'glow-violet': '0 0 35px -5px rgba(122, 64, 237, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(0, 178, 255, 0.35)',
      },
      letterSpacing: {
        'tight-hero': '-0.04em',
        'tight-title': '-0.03em',
        'tight-ui': '-0.018em',
      }
    },
  },
  plugins: [],
}
