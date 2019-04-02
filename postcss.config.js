module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.js"), // tailwindcss framework
    require('postcss-nested'),
    require('postcss-math'),
    require("autoprefixer") // autoprefixer (compability with outdates browser APIs)
  ]
};
