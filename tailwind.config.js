/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        accent: '#00a878',
        'light-gray': '#f5f5f5',
        'dark-text': '#1a1a1a',
        'blue-green': '#00a878'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        geist: ['Geist', 'sans-serif']
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px'
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: []
}
