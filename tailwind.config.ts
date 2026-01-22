import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'ccml-dark': '#151922',
        'ccml-gold': '#d1a53b',
        'ccml-gold-light': '#f4e4b8',
        'ccml-gold-hover': '#b08d45',
        'ccml-bg': '#fbf8f1',
        'ccml-input': '#fbfbfb',
        'ccml-border': '#ecdcbc',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-left': 'fadeInLeft 1s ease-out',
        'fade-in-right': 'fadeInRight 1s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInLeft: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        fadeInRight: { '0%': { opacity: '0', transform: 'translateX(30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
} satisfies Config
