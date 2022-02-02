const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      textPrimary: colors.black,
      textSecondary: "#333232",
      primary: "#A1D09D",
      secondary: "#22381B",
      neutralPrimary: "#E9DECD",
      neutralSecondary: "#DAD0C1",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
