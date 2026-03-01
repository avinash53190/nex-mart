/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.css'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Clash Display', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdfaf3',
          100: '#f9f1de',
          200: '#f0e0be',
          300: '#e3c88f',
          400: '#E6C77B',
          500: '#C6A75E', // Gold Primary
          600: '#a68a4b',
          700: '#866d3e',
          800: '#675331',
          900: '#4a3c26',
        },
        navy: {
          800: '#1F2937',
          900: '#111827', // Card BG
          950: '#0B1120', // Main BG
        },
        accent: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'pulse-slow': 'pulse 4s infinite',
        'gold-glow': 'goldGlow 2s infinite alternate',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: 0, transform: 'translateX(30px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        bounceIn: { '0%': { opacity: 0, transform: 'scale(0.8)' }, '70%': { transform: 'scale(1.05)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        goldGlow: { from: { boxShadow: '0 0 5px rgba(198,167,94,0.2)' }, to: { boxShadow: '0 0 20px rgba(198,167,94,0.4)' } },
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(0,0,0,0.3)',
        'card-hover': '0 12px 40px -8px rgba(0,0,0,0.5)',
        'gold': '0 4px 14px 0 rgba(198,167,94,0.39)',
        'gold-hover': '0 6px 20px rgba(198,167,94,0.23)',
      }
    },
  },
  plugins: [],
}
