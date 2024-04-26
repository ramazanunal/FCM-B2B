/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
<<<<<<< HEAD
        primary: "#FAF9F6",
        DarkBlue: "#394c69",
        LightBlue: "#31acd8",
        CustomGray: "#404E65",
        CustomRed: "#FF5B4B",
        BaseLight: "#f8f8f8",
        BaseDark: "#212121",
      },
      statusColor: {
        BeklemedeBg: "#e5e5e5",
        BeklemdeText: "#80808b",
        HazırlanıyorBg: "#c7e1c7",
        HazırlanıyorText: "#5d7b45",
        ÖdemeBekleniyorBg: "#f8dda5",
        ÖdemeBekleniyorText: "#876b17",
        TamamlandıBg: "#c7d8e2",
        TamamlandıText: "#324356",
        İptalEdilenBg: "#e3e5e3",
        İptalEdilenText: "#7a7a7c",
        BaşarısızOlanBg: "#eaa4a4",
        BaşarısızOlanText: "#762024",
=======
        primary: '#FAF9F6',
        DarkBlue: '#394c69',
        LightBlue: '#31acd8',
        CustomGray: '#404E65',
        CustomRed: '#FF5B4B',
        BaseLight: '#f8f8f8',
        BaseDark: '#212121',
        HoverGray: "#d1d5db",
        FooterText: "#c0c7d1"
>>>>>>> 9d193d15f6e0e7e6785ee2ca2b799f113c68eff2
      },
    },
  },
  plugins: [],
};
