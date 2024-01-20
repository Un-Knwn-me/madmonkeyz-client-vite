// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      metal: "#D9D9D9",
    },
    extend: {
      fontFamily: {
        'red-hat-display': ['Red Hat Display', 'sans-serif'],
      },
      margin: {
        '30': '7.5rem',
      }
    },
  },
  plugins: [],
});