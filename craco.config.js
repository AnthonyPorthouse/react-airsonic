module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },

  output: {
    hashFunction: 'xxhash64'
  }
};
