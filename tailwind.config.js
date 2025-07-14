/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f6ff',
          100: '#bae3ff',
          200: '#7cc4fa',
          300: '#47a3f3',
          400: '#2186eb',
          500: '#0967d2',
          600: '#0552b5',
          700: '#03449e',
          800: '#01337d',
          900: '#002159',
        },
        secondary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#adc1ff',
          400: '#8093ff',
          500: '#4d61fc',
          600: '#3a3ff7',
          700: '#272bdb',
          800: '#1d1fb1',
          900: '#181a8a',
        },
        dark: {
          100: '#8a8f98',
          200: '#797e89',
          300: '#676d7a',
          400: '#555d6b',
          500: '#434c5c',
          600: '#323b4d',
          700: '#212a3e',
          800: '#11192f',
          900: '#000820',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(66, 153, 225, 0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(66, 153, 225, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(26, 32, 44, 0.8), rgba(26, 32, 44, 0.8)), linear-gradient(90deg, rgba(66, 153, 225, 0.1) 1px, transparent 1px), linear-gradient(rgba(66, 153, 225, 0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}