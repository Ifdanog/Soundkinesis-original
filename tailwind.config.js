/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx',
    './components/**/*.jsx',
  ],
  darkMode: "class",

  theme: {
    colors: {
      'purple': '#7A0DEA',
      'pink': '#FF0080',
      'black': '#1D2123',
      'dark-black': '#000',
      'light-grey': '#D9D9D9',
      'darker-grey': '#606060',
      'dark-grey': '#8F8F8F',
      'white': '#EEEEEE',
      'lighter-grey': '#CDCDCD',
    },
  },
  plugins: [],
}
