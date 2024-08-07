/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'mainfont': 'Montserrat'
    },
    extend: {
      width: {
        '22': '5.5rem'
      },
      height: {
        '22': '5.5rem'
      },
      transitionProperty: {
        'height': 'height',
        'display': 'display',
        'top': 'top',
        'text': 'text'

      },
      transitionDuration: {
        '2000': '1100ms',
      },
      animation: {
        'lockAnimation': 'pulsate 0.5s ease-in-out infinite both',
        'color-change': 'colorChange 4s ease-in-out infinite alternate both',
      },
      keyframes: {
        pulsate: {
          '0%': { transform: 'scale(1)'},
          '50%': {transform: 'scale(1.3)'},
          '100%': {transform: 'scale(1)'}
        },
        colorChange: {
          '0%': {background: '#19dcea'},
          '100%': {background: '#b22cff'}
        },
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

        'dark': '#7e713b',
        'light': '#d6d2c0',
        'active': '#dcdcdc',


        'blue': '#ebf3ff',
        'blue-active': '#c2dcff', //header d9d3e5
        'dark-blue': '#002554', //active buttom header
        'textcolor': '#dedede', //text header active
        'special-red': 'rgb(235, 16, 0, 0.20)',//for delete

        'grdnt-1' : '#1C1D8E',
        'grdnt-2' : '#4958C6',
        'grdnt-3' : '#7694FD',

        '2grdnt-1' : '#1BAB91',
        '2grdnt-2' : '#61B2EE',
        '2grdnt-3' : '#F1A8D2',


        'grey': '#B4B4B4',
        'pantone-black': '#231f20',
        'fontColor': '#112D4E',
        'pantone-light': '#ecece7',
        
      },
      boxShadow: {
        '1-1-4': '1px 1px 3px rgb(0 0 0 / 0.25)',
        '0-0-7-inner': 'inset 0px 0px 7px 1px rgb(0 0 0 / 0.25)',
        'popup': '0px 0px 70px 2px rgb(0 0 0 / 0.5)',
        'input': '0px 0px 20px 2px rgb(0 0 0 / 0.5)',
      },
      backgroundImage: {
        // 'settings': "url('./src/images/settings.png')"
      }
    },
  },
  plugins: [],
}
