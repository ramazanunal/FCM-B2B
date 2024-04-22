/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './containers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#FAF9F6',
        DarkBlue: '#394c69',
        LightBlue: '#31acd8',
        CustomGray: '#404E65',
        CustomRed: '#FF5B4B',
        BaseLight: '#f8f8f8',
        BaseDark: '#212121',
      },
    },
  },
  plugins: [],
};
