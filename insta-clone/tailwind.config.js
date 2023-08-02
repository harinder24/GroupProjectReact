/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'phone': "url('./src/public/phone.png')",
        'igtextlogo': "url('./src/public/instagramlogotext.png')",
      },
      backgroundPosition: {
        'iglogologin': '0px -52px',
        'phoneimg': '-46px 0px'
      },
      objectPosition:{
        'navinstalogo': "0px -31.5px",
        'navinstalogodark': "0px -1.5px"
      },
      backgroundColor: {
        'navHover' : "var(--grayfive)"
      }
    },
  },
  plugins: [],
};
