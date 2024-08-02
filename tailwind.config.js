/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-open-sans)', 'ui-sans-serif', 'system-ui'],
        secondary: ['var(--font-fjalla-one)', 'ui-serif'],
      },
      colors: {
        mo: {
          // Couleurs de base
          bg: '#F2F2F2',
          primary: '#4088cf',
          secondary: '#5bc0de',
          tertiary: '#70cbe6',
          text: '#000',
          accent: '#d9534f',
          valid: '#4CAF50',
          brain: '#d433a9',
          // Couleurs d'état
          error: '#ad2626',
          success: '#00FF00',
          info: '#17A2B8',
          warning: '#FFC107',
          //Discord
          discord: '#5468ff',
          discordHover: '#656c85cc',
        },
      },
    },
  },
  plugins: [],
}
