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
        "scale-up-center": "scale-up-center .5s both",
        "slide-bottom": "slide-bottom .5s both",
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
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5) translate(-50%,-50%)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1) translate(-50%,-50%)",
          },
        },
        "slide-botom": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
          "100%": {
            "-webkit-transform": "translateY(100px)",
            transform: "translateY(100px)",
          },
        },
      },
    },
  },
  plugins: [],
};
