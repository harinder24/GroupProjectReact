/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'phone': "url('https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk')",
        'igtextlogo': "url('https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png')",
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