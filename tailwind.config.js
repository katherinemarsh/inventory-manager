const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      textPrimary: "#000000",
      textSecondary: "#333232",
      textWhite: "#FFFFFF",
      primary: "#A1D09D",
      secondary: "#22381B",
      neutralPrimary: "#E9DECD",
      neutralSecondary: "#DAD0C1",
      negativeButtonPrimary: "#B07B79",
      negativeButtonSecondary: "#603333",
      positiveButtonPrimary: "#6B9E66",
      positiveButtonSecondary: "#306733",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
