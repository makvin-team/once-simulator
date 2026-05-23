/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FFF6E6', 2: '#FFEFD1' },
        paper: '#FFFAF0',
        ink: { DEFAULT: '#3B2A1F', 2: '#6B4F3F', soft: '#8E7261' },
        line: '#2B1E16',
        peach: { DEFAULT: '#FFB68A', deep: '#FF8E5C' },
        butter: { DEFAULT: '#FFD86B', deep: '#F5B73D' },
        mint: { DEFAULT: '#A8E5C8', deep: '#5FCFA0' },
        sky: { DEFAULT: '#A6D8FF', deep: '#5AB7F2' },
        rose: { DEFAULT: '#FFB3C0', deep: '#F47A92' },
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        sans: ['Quicksand', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        plush: '0 6px 0 #2B1E16, 0 14px 28px rgba(43,30,22,0.18)',
        'plush-sm': '0 4px 0 #2B1E16, 0 8px 16px rgba(43,30,22,0.15)',
        'plush-tiny': '0 2px 0 #2B1E16',
        'plush-btn': '0 5px 0 #2B1E16, 0 10px 18px rgba(43,30,22,0.18)',
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        sm: '14px',
        md: '22px',
        lg: '36px',
        pill: '999px',
      },
      animation: {
        'pulse-ring': 'pulseRing 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wobble: 'wobble 3.6s ease-in-out infinite',
        floaty: 'floaty 3s ease-in-out infinite',
        breathe: 'breathe 3.5s ease-in-out infinite',
        popin: 'popin 500ms cubic-bezier(.5,1.7,.4,1) backwards',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        wobble: {
          '0%,100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        breathe: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        popin: {
          '0%': { transform: 'scale(0.6) rotate(-6deg)', opacity: '0' },
          '60%': { transform: 'scale(1.08) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
      },
    },
  },
  plugins: [],
};
