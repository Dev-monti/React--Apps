module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bgCorrect': '#4ade80',
        'bgPresent': '#facc15',
        'bgAbsent': '#94a3b8'
      },
      transitionDelay: {},
      keyframes: {
        alertLfToRi: {
          '0%': {transform: 'translate(-10px,0)'},
          '5%': {transform: 'translate(0px,0)'},
          '15%': {transform: 'translate(-10px,0)'},
          '20%': {transform: 'translate(0px,0)'},
          '25%': {transform: 'translate(10px,0)'},
          '30%': {transform: 'translate(0px,0)'},
          '35%': {transform: 'translate(-10px,0)'},
          '40%': {transform: 'translate(0px,0)'},
          '50%': {transform: 'translate(10px,0)'},
          '60%': {transform: 'translate(0px,0)'},
          // '100%': {transform: 'translate(0px,0)'},
        },
        scale: {
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        keyAnimate: {
          '25%': {transform: 'translateX(-3px)'},
          '50%': {transform: 'translateX(0px)'},
          '75%': {transform: 'translateX(-3px)'},
          '100%': {transform: 'translateX(0px)'},
        },
        animation: {
          scale: 'wiggle 1s ease-in-out',
          alertLfToRi: 'wiggle 1s ease-in-out',
          keyAnimate: 'wiggle .5s ease-in-out',
        }
      }
    },
  },
  plugins: [],
}