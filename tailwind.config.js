
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#007236',
          '100': '#f9d794',
          '200': '#007236',
          '300': '#f4b833',
          '400': '#007236', // base color
          '500': '#423E34',
          '600': '#c8a12b',
          '700': '#336c42',
          '800': '#007236',
          '900': '#0E9F6E.',
          '950': '#006736',
          'Gray': '#423E34',
          'Gray-100': 'rgba(66, 62, 52, 0.20)'
        },
        secondary: {
          '50': '#fef8ec',
          '100': '#fbebca',
          '200': 'f7d590',
          '300': '#f2ba57',
          '400': '#efa130',
          '500': '#e88018',
          '600': '#c55a11',
          '700': 'f7d590',
          '800': '#8b3315',
          '900': '#722b15',
          '950': '#411307',
      },
      },
      backgroundColor: {
        'bgGray': '#423E34',
        'bgGray-100': 'rgba(66, 62, 52, 0.20)'
      },
      borderColor: {
        'gray': '#423E34'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
