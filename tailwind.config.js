/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },

      fontSize: {
        hero: [
          'clamp(2.75rem, 6vw, 4.5rem)',
          {
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            fontWeight: '600',
          },
        ],

        'display-2xl': [
          'clamp(2.2rem, 4.5vw, 3.2rem)',
          {
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontWeight: '600',
          },
        ],

        'display-xl': [
          'clamp(1.9rem, 3.5vw, 2.6rem)',
          {
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            fontWeight: '500',
          },
        ],

        'display-lg': [
          'clamp(1.5rem, 2.5vw, 2rem)',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.015em',
            fontWeight: '500',
          },
        ],

        'display-md': [
          'clamp(1.25rem, 2vw, 1.6rem)',
          {
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],

        'display-sm': [
          '1.1rem',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: '500',
          },
        ],

        'body-xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        caption: [
          '0.6875rem',
          { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.1em' },
        ],
      },

      colors: {
        offwhite: '#F5F5F0',
        offblack: '#0A0A0A',

        brand: {
          blue: '#21409a',
          orange: '#ea9944',
        },

        accent: {
          DEFAULT: '#21409a',
          light: '#3a57b5',
          dark: '#1b347a',
        },

        neutral: {
          50: '#F5F6FA',
          100: '#E6E9F2',
          200: '#CDD3E4',
          300: '#A3ABC7',
          400: '#7C84A6',
          500: '#5C6385',
          600: '#434866',
          700: '#2E324A',
          800: '#1C1F33',
          900: '#0A0A0A',
          950: '#050505',
        },
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        gutter: 'clamp(1.5rem, 4vw, 3rem)',
        section: 'clamp(5rem, 12vh, 8rem)',
        'section-lg': 'clamp(7rem, 16vh, 12rem)',
      },

      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1000: '1000ms',
        1200: '1200ms',
      },

      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        reveal: 'reveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'line-grow': 'lineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};
