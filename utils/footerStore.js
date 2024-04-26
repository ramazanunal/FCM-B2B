import create from 'zustand';

const footerStore = create((set) => ({
    text: [
        {
            name: "© Designed By Enes Gülcü"
        }
    ],
    footerLogo: [
        {
          logosrc: "https://caliskanari.com/wp-content/uploads/2022/11/x-04.png",
        },
      ],
}));

export default footerStore;
