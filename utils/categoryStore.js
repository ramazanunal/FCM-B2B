import create from 'zustand';

const categoryStore = create((set) => ({
  categories: [
    { 
      id: 16, 
      name: "ÇALIŞKAN ARI (1-4. SINIFLAR)",
      products: [
        { id: 1, name: "1.SINIF ALTIN SET", price: "690,00", link: "https://caliskanari.com/shop/1-sinif-altin-set/", imagesrc: "https://caliskanari.com/wp-content/uploads/2022/11/Altin-Set-Reklam-2022-02-420x420.png.webp" },
      ]
    },
    { 
      id: 18, 
      name: "KÜÇÜK ARILAR (OKUL ÖNCESİ)",
      products: [
        { id: 13, name: "1 KAVANOZ EĞİTİM SETİ", link: "https://caliskanari.com/shop/1-kavanoz-egitim-seti/", imagesrc: "https://caliskanari.com/wp-content/uploads/2022/11/r-02-e1669032186303-210x210.png.webp" },
      ]
    },
    { 
      id: 19, 
      name: "HEYDAY ENGLİSH (İNGİLİZCE)",
      products: [
        { id: 25, name: "HEYDAY 2.SINIF", price: "200,00", link: "https://caliskanari.com/shop/heyday-2-sinif/", imagesrc: "https://caliskanari.com/wp-content/uploads/2022/11/Y-43-420x420.png.webp" },
      ]
    }
  ],
}));

export default categoryStore;
