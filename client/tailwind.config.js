/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'chr-black': '#080503',
        'chr-dark': '#100804',
        'chr-brown': '#1E0F07',
        'chr-mid': '#3D1F0F',
        'chr-warm': '#6B3A1F',
        'chr-gold': '#C9A55A',
        'chr-gold-light': '#E8D5A3',
        'chr-gold-pale': '#F5EDD8',
        'chr-cream': '#F0EBE1',
        'chr-muted': '#8C7B6A',
        'chr-faint': '#4A3A2E',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A55A 0%, #E8D5A3 50%, #C9A55A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #080503 0%, #1E0F07 100%)',
        'card-gradient': 'linear-gradient(145deg, #1E0F07 0%, #100804 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse_gold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,165,90,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,165,90,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        spin_slow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulse_gold 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin_slow 12s linear infinite',
        'scale-in': 'scaleIn 0.5s ease forwards',
      }
    }
  },
  plugins: []
};
