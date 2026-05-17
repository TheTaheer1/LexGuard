/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#15151f',
        primary: '#6d28d9', // purple-700
        secondary: '#06b6d4', // cyan-500
        accent: '#3b82f6', // blue-500
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(109, 40, 217, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(109, 40, 217, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
