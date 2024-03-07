/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightColor: "#2f1000",
        backgroundColor: "#010400",
        hoverColor:"#FFDCAB", 
      },
      backgroundImage:{
        'home': "url('/src/assets/img/bg-home.jpg')"
      }
    },
  },
  plugins: [],
};
