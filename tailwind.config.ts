/** @type {import('tailwindcss').Config} */
import { FoodAppColorPalette } from './src/tokens/foodApp';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // FoodApp Design System Colors
        'food-primary': FoodAppColorPalette.primary,
        'food-secondary': FoodAppColorPalette.secondary,
        'food-error': FoodAppColorPalette.error,
        'food-brand-primary': '#22C55E',
        'food-brand-secondary': '#FACC15',
      },
      backgroundImage: {
        'agent-thinking': 'linear-gradient(90deg, #22C55E 0%, #4ADE80 50%, #22C55E 100%)',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-hover': 'rgba(255, 255, 255, 0.85)',
        'glass-dark': 'rgba(33, 33, 33, 0.1)',
      },
      backdropFilter: {
        glass: 'blur(10px)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-gradient': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'pulse-gradient': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
