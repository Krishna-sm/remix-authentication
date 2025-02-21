import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        pblack:["Poppins_black"],
        pbold:["Poppins_bold"],
        pmedium:["Poppins_Medium"],
        pregular:["Poppins_Regular"],
        psmbold:["Poppins_SemiBold"],
      },
    },
  },
  plugins: [],
} satisfies Config;
