const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

// MEMO: inspired by https://mui.com/customization/palette/#default-values
// Light
const FARMERS_ONLY_PERSIAN_RED = Object.freeze({
  50: '#fdf5f5',
  100: '#fbeaea',
  200: '#f4cbcb',
  300: '#edacac',
  400: '#e06d6d',
  500: '#d32f2f',
  600: '#be2a2a',
  700: '#9e2323',
  800: '#7f1c1c',
  900: '#671717'
})
const FARMERS_ONLY_BILBAO = Object.freeze({
  50: '#f5f9f5',
  100: '#eaf2eb',
  200: '#cbdfcc',
  300: '#abcbad',
  400: '#6da470',
  500: '#2e7d32',
  600: '#29712d',
  700: '#235e26',
  800: '#1c4b1e',
  900: '#173d19'
})
const FARMERS_ONLY_ALABASTER = Object.freeze({
  50: '#ffffff',
  100: '#ffffff',
  200: '#fefefe',
  300: '#fdfdfd',
  400: '#fcfcfc',
  500: '#fafafa',
  600: '#e1e1e1',
  700: '#bcbcbc',
  800: '#969696',
  900: '#7b7b7b'
})
// Dark
const FARMERS_ONLY_SUNSET_ORANGE = Object.freeze({
  50: '#fef6f5',
  100: '#feeceb',
  200: '#fcd0cd',
  300: '#fbb4af',
  400: '#f77b72',
  500: '#f44336',
  600: '#dc3c31',
  700: '#b73229',
  800: '#922820',
  900: '#78211a'
})
const FARMERS_ONLY_FERN = Object.freeze({
  50: '#f7fcf8',
  100: '#f0f8f0',
  200: '#d9eeda',
  300: '#c2e4c3',
  400: '#94cf97',
  500: '#66bb6a',
  600: '#5ca85f',
  700: '#4d8c50',
  800: '#3d7040',
  900: '#325c34'
})
const FARMERS_ONLY_MINE_SHAFT = Object.freeze({
  50: '#f5f5f5',
  100: '#eaeaea',
  200: '#cbcbcb',
  300: '#acacac',
  400: '#6e6e6e',
  500: '#303030',
  600: '#2b2b2b',
  700: '#242424',
  800: '#1d1d1d',
  900: '#181818'
})
const FARMERS_ONLY_CAPE_COD = Object.freeze({
  50: '#f6f6f6',
  100: '#ececec',
  200: '#d0d0d0',
  300: '#b3b3b3',
  400: '#7b7b7b',
  500: '#424242',
  600: '#3b3b3b',
  700: '#323232',
  800: '#282828',
  900: '#202020'
})
const FARMERS_ONLY_CORNFLOWER_BLUE = Object.freeze({
  50: '#f4fafe',
  100: '#e9f5fe',
  200: '#c8e5fc',
  300: '#a6d5fa',
  400: '#64b6f7',
  500: '#2196f3',
  600: '#1e87db',
  700: '#1971b6',
  800: '#145a92',
  900: '#104a77'
})

// FarmersOnly color scheme
const FARMERS_ONLY_PIZAZZ = Object.freeze({
  50: '#fff9f3',
  100: '#fff3e6',
  200: '#ffe2c1',
  300: '#ffd09b',
  400: '#ffac51',
  500: '#ff8906',
  600: '#e67b05',
  700: '#bf6705',
  800: '#995204',
  900: '#7d4303'
})
const FARMERS_ONLY_PERSIMMON = Object.freeze({
  50: '#fef7f6',
  100: '#feefed',
  200: '#fcd7d2',
  300: '#fabfb7',
  400: '#f68f82',
  500: '#f25f4c',
  600: '#da5644',
  700: '#b64739',
  800: '#91392e',
  900: '#772f25'
})
const FARMERS_ONLY_CERISE_RED = Object.freeze({
  50: '#fef5f8',
  100: '#fceaf1',
  200: '#f9ccdb',
  300: '#f5adc6',
  400: '#ed6f9b',
  500: '#e53170',
  600: '#ce2c65',
  700: '#ac2554',
  800: '#891d43',
  900: '#701837'
})
const FARMERS_ONLY_CINDER = Object.freeze({
  50: '#f3f3f3',
  100: '#e7e7e8',
  200: '#c3c3c5',
  300: '#9f9fa2',
  400: '#57565d',
  500: '#0f0e17',
  600: '#0e0d15',
  700: '#0b0b11',
  800: '#09080e',
  900: '#07070b'
})
const FARMERS_ONLY_SANTAS_GRAY = Object.freeze({
  50: '#fbfbfc',
  100: '#f6f6f9',
  200: '#e9eaef',
  300: '#dcdde5',
  400: '#c1c3d2',
  500: '#a7a9be',
  600: '#9698ab',
  700: '#7d7f8f',
  800: '#646572',
  900: '#52535d'
})

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        farmersOnlyBilbao: {
          50: FARMERS_ONLY_BILBAO[50],
          100: FARMERS_ONLY_BILBAO[100],
          200: FARMERS_ONLY_BILBAO[200],
          300: FARMERS_ONLY_BILBAO[300],
          400: FARMERS_ONLY_BILBAO[400],
          DEFAULT: FARMERS_ONLY_BILBAO[500],
          600: FARMERS_ONLY_BILBAO[600],
          700: FARMERS_ONLY_BILBAO[700],
          800: FARMERS_ONLY_BILBAO[800],
          900: FARMERS_ONLY_BILBAO[900]
        },
        farmersOnlyFern: {
          50: FARMERS_ONLY_FERN[50],
          100: FARMERS_ONLY_FERN[100],
          200: FARMERS_ONLY_FERN[200],
          300: FARMERS_ONLY_FERN[300],
          400: FARMERS_ONLY_FERN[400],
          DEFAULT: FARMERS_ONLY_FERN[500],
          600: FARMERS_ONLY_FERN[600],
          700: FARMERS_ONLY_FERN[700],
          800: FARMERS_ONLY_FERN[800],
          900: FARMERS_ONLY_FERN[900]
        },
        farmersOnlyPersianRed: {
          50: FARMERS_ONLY_PERSIAN_RED[50],
          100: FARMERS_ONLY_PERSIAN_RED[100],
          200: FARMERS_ONLY_PERSIAN_RED[200],
          300: FARMERS_ONLY_PERSIAN_RED[300],
          400: FARMERS_ONLY_PERSIAN_RED[400],
          DEFAULT: FARMERS_ONLY_PERSIAN_RED[500],
          600: FARMERS_ONLY_PERSIAN_RED[600],
          700: FARMERS_ONLY_PERSIAN_RED[700],
          800: FARMERS_ONLY_PERSIAN_RED[800],
          900: FARMERS_ONLY_PERSIAN_RED[900]
        },
        farmersOnlySunsetOrange: {
          50: FARMERS_ONLY_SUNSET_ORANGE[50],
          100: FARMERS_ONLY_SUNSET_ORANGE[100],
          200: FARMERS_ONLY_SUNSET_ORANGE[200],
          300: FARMERS_ONLY_SUNSET_ORANGE[300],
          400: FARMERS_ONLY_SUNSET_ORANGE[400],
          DEFAULT: FARMERS_ONLY_SUNSET_ORANGE[500],
          600: FARMERS_ONLY_SUNSET_ORANGE[600],
          700: FARMERS_ONLY_SUNSET_ORANGE[700],
          800: FARMERS_ONLY_SUNSET_ORANGE[800],
          900: FARMERS_ONLY_SUNSET_ORANGE[900]
        },
        farmersOnlyMineShaft: {
          50: FARMERS_ONLY_MINE_SHAFT[50],
          100: FARMERS_ONLY_MINE_SHAFT[100],
          200: FARMERS_ONLY_MINE_SHAFT[200],
          300: FARMERS_ONLY_MINE_SHAFT[300],
          400: FARMERS_ONLY_MINE_SHAFT[400],
          DEFAULT: FARMERS_ONLY_MINE_SHAFT[500],
          600: FARMERS_ONLY_MINE_SHAFT[600],
          700: FARMERS_ONLY_MINE_SHAFT[700],
          800: FARMERS_ONLY_MINE_SHAFT[800],
          900: FARMERS_ONLY_MINE_SHAFT[900]
        },
        farmersOnlyCapeCod: {
          50: FARMERS_ONLY_CAPE_COD[50],
          100: FARMERS_ONLY_CAPE_COD[100],
          200: FARMERS_ONLY_CAPE_COD[200],
          300: FARMERS_ONLY_CAPE_COD[300],
          400: FARMERS_ONLY_CAPE_COD[400],
          DEFAULT: FARMERS_ONLY_CAPE_COD[500],
          600: FARMERS_ONLY_CAPE_COD[600],
          700: FARMERS_ONLY_CAPE_COD[700],
          800: FARMERS_ONLY_CAPE_COD[800],
          900: FARMERS_ONLY_CAPE_COD[900]
        },
        farmersOnlyAlabaster: {
          50: FARMERS_ONLY_ALABASTER[50],
          100: FARMERS_ONLY_ALABASTER[100],
          200: FARMERS_ONLY_ALABASTER[200],
          300: FARMERS_ONLY_ALABASTER[300],
          400: FARMERS_ONLY_ALABASTER[400],
          DEFAULT: FARMERS_ONLY_ALABASTER[500],
          600: FARMERS_ONLY_ALABASTER[600],
          700: FARMERS_ONLY_ALABASTER[700],
          800: FARMERS_ONLY_ALABASTER[800],
          900: FARMERS_ONLY_ALABASTER[900]
        },
        farmersOnlyPizazz: {
          50: FARMERS_ONLY_PIZAZZ[50],
          100: FARMERS_ONLY_PIZAZZ[100],
          200: FARMERS_ONLY_PIZAZZ[200],
          300: FARMERS_ONLY_PIZAZZ[300],
          400: FARMERS_ONLY_PIZAZZ[400],
          DEFAULT: FARMERS_ONLY_PIZAZZ[500],
          600: FARMERS_ONLY_PIZAZZ[600],
          700: FARMERS_ONLY_PIZAZZ[700],
          800: FARMERS_ONLY_PIZAZZ[800],
          900: FARMERS_ONLY_PIZAZZ[900]
        },
        farmersOnlyPersimmon: {
          50: FARMERS_ONLY_PERSIMMON[50],
          100: FARMERS_ONLY_PERSIMMON[100],
          200: FARMERS_ONLY_PERSIMMON[200],
          300: FARMERS_ONLY_PERSIMMON[300],
          400: FARMERS_ONLY_PERSIMMON[400],
          DEFAULT: FARMERS_ONLY_PERSIMMON[500],
          600: FARMERS_ONLY_PERSIMMON[600],
          700: FARMERS_ONLY_PERSIMMON[700],
          800: FARMERS_ONLY_PERSIMMON[800],
          900: FARMERS_ONLY_PERSIMMON[900]
        },
        farmersOnlyCeriseRed: {
          50: FARMERS_ONLY_CERISE_RED[50],
          100: FARMERS_ONLY_CERISE_RED[100],
          200: FARMERS_ONLY_CERISE_RED[200],
          300: FARMERS_ONLY_CERISE_RED[300],
          400: FARMERS_ONLY_CERISE_RED[400],
          DEFAULT: FARMERS_ONLY_CERISE_RED[500],
          600: FARMERS_ONLY_CERISE_RED[600],
          700: FARMERS_ONLY_CERISE_RED[700],
          800: FARMERS_ONLY_CERISE_RED[800],
          900: FARMERS_ONLY_CERISE_RED[900]
        },
        farmersOnlyCinder: {
          50: FARMERS_ONLY_CINDER[50],
          100: FARMERS_ONLY_CINDER[100],
          200: FARMERS_ONLY_CINDER[200],
          300: FARMERS_ONLY_CINDER[300],
          400: FARMERS_ONLY_CINDER[400],
          DEFAULT: FARMERS_ONLY_CINDER[500],
          600: FARMERS_ONLY_CINDER[600],
          700: FARMERS_ONLY_CINDER[700],
          800: FARMERS_ONLY_CINDER[800],
          900: FARMERS_ONLY_CINDER[900]
        },
        farmersOnlySantasGray: {
          50: FARMERS_ONLY_SANTAS_GRAY[50],
          100: FARMERS_ONLY_SANTAS_GRAY[100],
          200: FARMERS_ONLY_SANTAS_GRAY[200],
          300: FARMERS_ONLY_SANTAS_GRAY[300],
          400: FARMERS_ONLY_SANTAS_GRAY[400],
          DEFAULT: FARMERS_ONLY_SANTAS_GRAY[500],
          600: FARMERS_ONLY_SANTAS_GRAY[600],
          700: FARMERS_ONLY_SANTAS_GRAY[700],
          800: FARMERS_ONLY_SANTAS_GRAY[800],
          900: FARMERS_ONLY_SANTAS_GRAY[900]
        },
        farmersOnlyCornflowerBlue: {
          50: FARMERS_ONLY_CORNFLOWER_BLUE[50],
          100: FARMERS_ONLY_CORNFLOWER_BLUE[100],
          200: FARMERS_ONLY_CORNFLOWER_BLUE[200],
          300: FARMERS_ONLY_CORNFLOWER_BLUE[300],
          400: FARMERS_ONLY_CORNFLOWER_BLUE[400],
          DEFAULT: FARMERS_ONLY_CORNFLOWER_BLUE[500],
          600: FARMERS_ONLY_CORNFLOWER_BLUE[600],
          700: FARMERS_ONLY_CORNFLOWER_BLUE[700],
          800: FARMERS_ONLY_CORNFLOWER_BLUE[800],
          900: FARMERS_ONLY_CORNFLOWER_BLUE[900]
        },
        // MEMO: inspired by https://mui.com/customization/dark-mode/
        farmersOnlyTextPrimaryInLightMode: 'rgba(0, 0, 0, 0.87)',
        farmersOnlyTextSecondaryInLightMode: 'rgba(0, 0, 0, 0.6)',
        farmersOnlyTextPrimaryInDarkMode: colors.white,
        farmersOnlyTextSecondaryInDarkMode: 'rgba(255, 255, 255, 0.7)'
      },
      backgroundColor: {
        defaultInLightMode: FARMERS_ONLY_ALABASTER[500],
        defaultInDarkMode: FARMERS_ONLY_MINE_SHAFT[500],
        paperInLightMode: colors.white,
        paperInDarkMode: FARMERS_ONLY_CAPE_COD[500]
      },
      // MEMO: inspired by https://material-ui.com/customization/default-theme/
      zIndex: {
        farmersOnlyMobileStepper: 1000,
        farmersOnlySpeedDial: 1050,
        farmersOnlyAppBar: 1100,
        farmersOnlyDrawer: 1200,
        farmersOnlyModal: 1300,
        farmersOnlySnackbar: 1400,
        farmersOnlyTooltip: 1500
      }
    }
  },
  variants: {
    extend: {
      padding: ['important'],
      backgroundColor: ['important'],
      backgroundOpacity: ['important'],
      boxShadow: ['important'],
      borderRadius: ['important'],
      textColor: ['important']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
    plugin(function({ addVariant }) {
      // MEMO: inspired by https://github.com/tailwindlabs/tailwindcss/issues/493#issuecomment-610907147
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    })
  ]
}
