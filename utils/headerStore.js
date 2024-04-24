import create from "zustand";
import { GrEdit } from "react-icons/gr";
import { RiBook3Line } from "react-icons/ri";
import { LuBaby } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
const headerStore = create((set) => ({
  header: {
    menus: [
      {
        id: 1,
        text: "Anasayfa",
        href: "https://caliskanari.com/",
        subMenus: [],
      },
      {
        id: 2,
        text: "Çalışkan Arı",
        href: "https://caliskanari.com.tr/",
        subMenus: [
          {
            id: 1,
            text: "Çalışkan Arı Kütüphane",
            href: "https://caliskanari.com.tr/online-kutuphane/",
          },
        ],
      },
      {
        id: 3,
        text: "Küçük Arılar",
        href: "https://kucukarilarakademisi.com/",
        subMenus: [
          {
            id: 1,
            text: "Küçük Arılar Kütüphane",
            href: "https://kucukarilarakademisi.com/index.php/online-kutuphane/",
          },
        ],
      },
      {
        id: 4,
        text: "Heyday English",
        href: "https://heydayenglish.com/",
        subMenus: [],
      },
      {
        id: 5,
        text: "İletişim",
        href: "https://caliskanari.com/contact-us/",
        subMenus: [],
      },
      {
        id: 6,
        text: "Beğendiklerim",
        href: "https://caliskanari.com/wishlist/",
        subMenus: [],
      },
      {
        id: 7,
        text: "Çalışkan Arı 1. Sınıf",
        href: "https://caliskanari.com/1-sinif/",
        subMenus: [],
      },
      {
        id: 8,
        text: "Giriş / Kayıt",
        href: "https://caliskanari.com/my-account/edit-account/",
        subMenus: [],
      },
    ],
    mainMenuLogo: [
      {
        logosrc: "https://caliskanari.com/wp-content/uploads/2022/11/x-04.png",
      },
    ],
    mainMenuItems: [
      {
        id: 1,
        text: "ÇALIŞKAN ARI (1-4. SINIFLAR)",
        href: "https://caliskanari.com/urun-kategori/caliskan-ari/",
        icon: <GrEdit style={{ width: "45px", height: "45px" }} />,
        subMenus: [
          {
            id: 1,
            text: "1. Sınıf",
            href: "https://caliskanari.com/urun-kategori/caliskan-ari/1-sinif-caliskan-ari/",
          },
          {
            id: 2,
            text: "2. Sınıf",
            href: "https://caliskanari.com/urun-kategori/caliskan-ari/2-sinif-caliskan-ari/",
          },
          {
            id: 3,
            text: "3. Sınıf",
            href: "https://caliskanari.com/urun-kategori/caliskan-ari/3-sinif-caliskan-ari/",
          },
          {
            id: 4,
            text: "4. Sınıf",
            href: "https://caliskanari.com/urun-kategori/caliskan-ari/4-sinif-caliskan-ari/",
          },
        ],
      },
      {
        id: 2,
        text: "HEYDAY ENGLİSH (İNGİLİZCE)",
        href: "https://caliskanari.com/urun-kategori/heyday/",
        icon: <RiBook3Line style={{ width: "45px", height: "45px" }} />,
        subMenus: [
          {
            id: 2,
            text: "2. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/2-sinif-english/",
          },
          {
            id: 3,
            text: "3. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/3-sinif-english/",
          },
          {
            id: 4,
            text: "4. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/4-sinif-english/",
          },
          {
            id: 5,
            text: "5. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/5-sinif-english/",
          },
          {
            id: 6,
            text: "6. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/6-sinif-english/",
          },
          {
            id: 7,
            text: "7. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/7-sinif-english/",
          },
          {
            id: 8,
            text: "8. Sınıf",
            href: "https://caliskanari.com/urun-kategori/heyday/8-sinif-english/",
          },
        ],
      },
      {
        id: 3,
        text: "KÜÇÜK ARILAR (OKUL ÖNCESİ)",
        href: "https://caliskanari.com/urun-kategori/heyday/",
        icon: <LuBaby style={{ width: "45px", height: "45px" }} />,
        subMenus: [],
      },
    ],
    mainMenuButtons: [
      {
        id: 1,
        href: "",
        icon: <FaSearch style={{ width: "20px", height: "20px" }} />,
      },
      {
        id: 2,
        href: "https://caliskanari.com/cart/",
        icon: <RiShoppingBasketFill style={{ width: "25px", height: "25px" }} />,
      },
    ],
  },
  footer: {
    copyright: "Tüm hakları saklıdır. Caliskanari © 2024",
  },
  // Yeni menü eklemek için
  addMenu: (newMenu) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: [...state.header.menus, newMenu],
      },
    })),
  // Menüyü kaldırmak için
  removeMenu: (index) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.filter((menu, i) => i !== index),
      },
    })),
  // Menü metnini güncellemek için
  setMenuText: (index, newText) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.map((menu, i) =>
          i === index ? { ...menu, text: newText } : menu
        ),
      },
    })),
  // Menü href'ini güncellemek için
  setMenuHref: (index, newHref) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.map((menu, i) =>
          i === index ? { ...menu, href: newHref } : menu
        ),
      },
    })),
  // Alt menü eklemek için
  addSubMenu: (menuIndex, newSubMenu) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.map((menu, i) => {
          if (i === menuIndex) {
            return {
              ...menu,
              subMenus: [...menu.subMenus, newSubMenu],
            };
          }
          return menu;
        }),
      },
    })),
  // Alt menüyü kaldırmak için
  removeSubMenu: (menuIndex, subMenuIndex) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.map((menu, i) => {
          if (i === menuIndex) {
            return {
              ...menu,
              subMenus: menu.subMenus.filter(
                (subMenu, j) => j !== subMenuIndex
              ),
            };
          }
          return menu;
        }),
      },
    })),
  // Alt menü metnini güncellemek için
  setSubMenuText: (menuIndex, subMenuIndex, newText) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.map((menu, i) => {
          if (i === menuIndex) {
            return {
              ...menu,
              subMenus: menu.subMenus.map((subMenu, j) =>
                j === subMenuIndex ? { ...subMenu, text: newText } : subMenu
              ),
            };
          }
          return menu;
        }),
      },
    })),
  // Alt menü href'ini güncellemek için
  setSubMenuHref: (menuIndex, subMenuIndex, newHref) =>
    set((state) => ({
      header: {
        ...state.header,
        menus: state.header.menus.map((menu, i) => {
          if (i === menuIndex) {
            return {
              ...menu,
              subMenus: menu.subMenus.map((subMenu, j) =>
                j === subMenuIndex ? { ...subMenu, href: newHref } : subMenu
              ),
            };
          }
          return menu;
        }),
      },
    })),
  // Menülerin sırasını değiştirmek için
  reorderMenus: (startIndex, endIndex) =>
    set((state) => {
      const menus = Array.from(state.header.menus);
      const [removed] = menus.splice(startIndex, 1);
      menus.splice(endIndex, 0, removed);

      return {
        header: {
          ...state.header,
          menus,
        },
      };
    }),

      // Admin logo fotoğrafını değiştirmek için

    setAdminLogo: (newLogoSrc) =>
    set((state) => ({
      header: {
        ...state.header,
        mainMenuLogo: [{ logosrc: newLogoSrc }],
      },
    })),
// Update addMenu function to accept dynamic link value
addMenu: (newMenu, link) =>
  set((state) => ({
    header: {
      ...state.header,
      menus: [...state.header.menus, { ...newMenu, href: link }],
    },
  })),

// Update setMenuHref function to accept dynamic link value
setMenuHref: (index, newHref) =>
  set((state) => ({
    header: {
      ...state.header,
      menus: state.header.menus.map((menu, i) =>
        i === index ? { ...menu, href: newHref } : menu
      ),
    },
  })),
 
}));

export default headerStore;
