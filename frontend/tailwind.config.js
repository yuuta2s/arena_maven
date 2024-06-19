/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#53B84A',
      secondary: '#1A7B16',
      tertiary: '#122604',
      vertBG: '#1c5b1a',
      black: '#000000',
      white: '#FFFFFF',
      red: '#dc2626'
    },
    background: {
      default: 'linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(28,91,26,1) 48%, rgba(0,0,0,1) 100%)',
    },
    fontFamily: {

    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '1440': '90rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'underline-title': "url('/src/assets/Rectangle 261.svg')"
      }
    }
  },
  plugins: [],
};