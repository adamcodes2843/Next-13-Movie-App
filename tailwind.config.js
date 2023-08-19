/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skin: {
          base: 'var(--medium-color)',
          light: 'var(--light-color)',
          dark: 'var(--dark-color)'
        }
      },
      outlineColor: {
        skin: {
          light: 'var(--light-color)'
        }
      },
      borderColor: {
        skin: {
          base: 'var(--medium-color)',
          light: 'var(--light-color)',
          dark: 'var(--dark-color)'
        }
      },
      ringColor:{
        skin: {
          light: 'var(--light-color)'
        }
      },
      textColor:{
        skin: {
          base: 'var(--medium-color)',
          light: 'var(--light-color)',
          dark: 'var(--dark-color)'
        }
      },
      backgroundColor: {
        skin: {
          base: 'var(--medium-color)',
          light: 'var(--light-color)',
          dark: 'var(--dark-color)'
        }
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(15rem,1fr))",
      },
      keyframes: {
        closeFooter: {
          '70%': {
            transform: 'translateY(0)',
            opacity: '100'
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0'
          }
        },
        saving: {
          '0': {
            opacity: '100%'
          },
          '80%': {
            opacity: '100%'
          },
          '100%': {
            opacity: '0%',
            display: 'none'
          }
        }
      },
      animation: {
        closeFooter: 'closeFooter 4.5s ease-in 1 forwards',
        saving: 'saving 2.5s ease-in-out 1 forwards'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
