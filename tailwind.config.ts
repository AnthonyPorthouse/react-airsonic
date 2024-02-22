import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
