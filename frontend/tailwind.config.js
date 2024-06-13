/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme1: {
          50: "#ffebee",
          100: "#ffcdd2",
          200: "#ef9a9a",
          300: "#e57373",
          400: "#ef5350",
          500: "#f8edeb",
          600: "#c62828",
          700: "#b71c1c",
          800: "#edcfd3",
          900: "#e5a8b1", // main pink
          950: "#7f1d1d",
        },
      },
    },
    plugins: [],
  },
};