/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      inter: ["Lato", "sans-serif"],
    },
    colors: {
      ...colors,
      qub: {
        primary: "#d6e3fe",
        secondary: "#c3d5f7",
        tertiary: "#015cbb",
        light: "#faf9fd",
        orange: "#ff904d",
      },
    },
  },
  plugins: [],
};
