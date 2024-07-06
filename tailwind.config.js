/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6956E5",
        error: "#E0173C",
        success: "#12A380",
        typo: "#1D2433",
      },
      backgroundImage: {
        'btn': 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%)',
        login: "url('/public/assets/img/signup_image.webp')"
      },

      boxShadow: {
        btn: "0px 1px 2px 0px rgba(164, 172, 185, 0.24)",
        box: "0px 0px 0px 1px rgba(18, 55, 105, 0.08), 0px 1px 2px 0px rgba(164, 172, 185, 0.24)",
      },
    },
  },
  plugins: [],
};
