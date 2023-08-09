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
        openFooter: {
          '0': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '100'
          }
        }
      },
      animation: {
         closeFooter: 'closeFooter 4.5s ease-in 1 forwards',
         openFooter: 'openFooter 4.5s ease-out 1 forwards'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
