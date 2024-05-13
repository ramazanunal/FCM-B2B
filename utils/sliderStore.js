import { create } from 'zustand'

const sliderStore = create((set) => ({
  images: [
    {
      id: 1,
      src: 'https://caliskanari.com/wp-content/uploads/2016/10/1.png',
      alt: '1',
      title: '1',
    },
    {
      id: 2,
      src: 'https://caliskanari.com/wp-content/uploads/2016/10/2.png.webp',
      alt: '2',
      title: '2',
    },
    {
      id: 3,
      src: 'https://caliskanari.com/wp-content/uploads/2016/10/3.png.webp',
      alt: '3',
      title: '3',
    },
  ],
}));

export default sliderStore;
