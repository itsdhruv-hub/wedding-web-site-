/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5E6BA',
          DEFAULT: '#D4AF37',
          dark: '#9A7B1C',
          rose: '#B8860B',
        },
        royal: {
          maroon: '#4A0E17',
          maroonDark: '#2D070C',
          emerald: '#0F4C3A',
          navy: '#0B1D3A',
        },
        cream: {
          light: '#FFFDF9',
          DEFAULT: '#FAF5EE',
          dark: '#F3EAD8',
        },
        champagne: '#F7E7CE',
        dustyRose: '#E0B0B0',
        softBrown: '#4A3E3D',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
        gujarati: ['"Noto Serif Gujarati"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'royal': '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 20px rgba(212, 175, 55, 0.2)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
}
