/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  'index.html'],
  theme: {
    extend: {
      colors: {
        "primary-color" : '#615551',
        "gradient": 'linear-gradient(to right bottom,#fbdb89,#f48982)',
        "slate-hover": "#f2efee",
        "result-text": "#f38e82"
      },
      backgroundImage: {
        "gradient": 'linear-gradient(to right bottom,#fbdb89,#f48982)',
      }
    },
  },
  plugins: [],
}