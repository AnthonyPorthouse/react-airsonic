module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        sunrise: '#f23cd6',
        skyline: '#261447',
        midnight: '#0d0221',
      },

      fontFamily: {
        "work-sans": ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
