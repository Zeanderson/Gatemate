/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Arvo': ['Arvo'],
      },
      colors: {
        Nature1: '#687864',
        Nature2: '#31708E',
        Nature3: '#5085A5',
        Nature4: '#8FC1E3',
        Nature5: '#F7F9FB',
        Corp1: '#88BDBC',
        Corp2: '#254E58',
        Corp3: '#112D32',
        Corp4: '#4F4A41',
        Corp5: '#6E6658'
      },
      screens: {
        "sm": "640px",
        "3xl": "1920px",
        "4xl": "2560px",
      }
    },
  },
  plugins: [],
}