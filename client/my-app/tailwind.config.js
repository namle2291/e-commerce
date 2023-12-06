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
      animation: {
        "slide-right": "slide-right 1s both",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateY(3000px)",
            transform: "translateY(3000px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0px)",
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
