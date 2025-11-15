/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Background Images
      backgroundImage: {
        'school': "url('/images/school-background.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-pattern.svg')",
        'game-bg': "url('/images/game-background.jpg')",
      },
      
      // Font Families
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        'montserrat': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      
      // Custom Colors for Gaming Theme
      colors: {
        'game-primary': '#3B82F6',
        'game-secondary': '#8B5CF6',
        'achievement-gold': '#F59E0B',
        'achievement-silver': '#6B7280',
        'achievement-bronze': '#92400E',
        'success-green': '#10B981',
        'danger-red': '#EF4444',
        'warning-yellow': '#F59E0B',
      },
      
      // Custom Font Sizes for Gaming Elements
      fontSize: {
        'game-title': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'achievement': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'points': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
        'badge': ['0.875rem', { lineHeight: '1.25', fontWeight: '600' }],
      },
      
      // Animation for Gaming Effects
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      
      // Custom Spacing for Gaming Layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Box Shadows for Gaming Cards
      boxShadow: {
        'game': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'achievement': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
