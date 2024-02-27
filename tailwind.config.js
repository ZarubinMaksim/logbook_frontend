/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light-grey': '#EAEAEA', 
        'light-purple': '#E6F4E5',
        'color': '#FBFBFB',
        'border-grey': 'E9ECEF',


        'grey': '#B4B4B4',
        'pantone-black': '#231f20',
        'fontColor': '#112D4E',
        'pantone-light': '#ecece7',
        
      },
      boxShadow: {
        '1-1-4': '1px 1px 4px rgb(0 0 0 / 0.25)',
        '1-1-4-inner': 'inset 1px 1px 4px rgb(0 0 0 / 0.25)'
      },
      backgroundImage: {
        // 'settings': "url('./src/images/settings.png')"
      }
    },
  },
  plugins: [],
}
