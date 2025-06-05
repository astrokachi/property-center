/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D267D",
        secondary: "",
        background: "#A6B9FF1E",
        whitish: "#F6F6F6",
        light: "#0D267D30",
        faded: "#00000082",
        gray: "#667085",
        grayDark: "#475467",
        purp: "#4961EA",
        grey: "#DADADABF",
        disabled: "#DDE1ED",
      },
      animation: {
        wiggle: "wiggle 300ms ease-in forwards 0.4s",
        dropdown: "dropdown 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        slideIn: "slideIn 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        shake: "shakeKeyframe 100ms cubic-bezier(0.4, 0, 0.2, 1)",
        slideOut: "slideOut 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        fadeIn: "fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        fadeOut: "fadeOut 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        slideDown: "slideDown 200ms ease-in forwards",
        slideUp: "slideUp 200ms ease-in forwards",
        "success-pulse":
          "success-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 700ms ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        dropdown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-6px)",
            pointerEvents: "none",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
            pointerEvents: "auto",
          },
        },
        slideIn: {
          "0%": {
            opacity: 0,
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        slideOut: {
          "0%": { opacity: 1, transform: "translateX(0px)" },
          "50%": { "z-index": "100" },
          "90%": { "z-index": "100" },
          "100%": {
            opacity: 0,
            transform: "translateX(40px)",
            "z-index": "-310",
          },
        },
        slideDown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-40px)",
            "z-index": "10",
          },
          "100%": { opacity: 1, transform: "translateY(0px)", "z-index": "10" },
        },
        slideUp: {
          "0%": { opacity: 1, transform: "translateY(0px)", "z-index": "10" },
          "100%": {
            opacity: 0,
            transform: "translateY(-30px)",
            "z-index": "-10",
          },
        },
        shakeKeyframe: {
          "0%": { transform: "translateX(0px)" },
          "25%": { transform: "translateX(10px)" },
          "50%": { transform: "translateX(0px)" },
          "75%": { transform: "translateX(-10px)" },
          "100%": { transform: "translateX(0px)" },
        },
        "success-pulse": {
          "0%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: 0.7,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
