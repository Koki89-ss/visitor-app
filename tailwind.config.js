/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050516",
          blue: "#61aafb",
          grey: "#414244",
          light: "#f2f2f2",
        },
      },
    },
  },
  plugins: [],
};
