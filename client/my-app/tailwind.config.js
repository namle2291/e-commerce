/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popin: "Poppins",
        open_sans: "Open Sans",
      },
      colors: {
        main_color: "var(--main_color)",
      },
    },
  },
  plugins: [],
};
