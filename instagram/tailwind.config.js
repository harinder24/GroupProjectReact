/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'phone': "url('/phone.png')",
        'igtextlogo': "url('/instagramlogotext.png')",
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
