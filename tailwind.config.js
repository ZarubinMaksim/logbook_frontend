/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'mainfont': 'Montserrat'
    },
    extend: {
      transitionProperty: {
        'height': 'height',
        'display': 'display',
        'top': 'top',

      },
      transitionDuration: {
        '2000': '1100ms',
      },
      colors: {
        'light-grey': '#EAEAEA', 
        'light-purple': '#E6F4E5',
        'color': '#fff',
        'border-grey': 'E9ECEF',

        'main-black': '#161616',
        'header-focus': '#E6E6E6',
        'header-active-focus': '#427F45',
        'header-active': '#82A385',


        'blue': '#ebf3ff',
        'blue-active': '#c2dcff', //header d9d3e5
        'dark-blue': '#002554', //active buttom header
        'textcolor': '#dedede', //text header active
        'special-red': 'rgb(235, 16, 0, 0.20)',//for delete

        'grey': '#B4B4B4',
        'pantone-black': '#231f20',
        'fontColor': '#112D4E',
        'pantone-light': '#ecece7',
        
      },
      boxShadow: {
        '1-1-4': '1px 1px 3px rgb(0 0 0 / 0.25)',
        '0-0-7-inner': 'inset 0px 0px 7px 1px rgb(0 0 0 / 0.25)',
        'popup': '0px 0px 70px 2px rgb(0 0 0 / 0.5)'
      },
      backgroundImage: {
        // 'settings': "url('./src/images/settings.png')"
      }
    },
  },
  plugins: [],
}
