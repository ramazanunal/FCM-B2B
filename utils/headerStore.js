import create from 'zustand';

const headerStore = create((set) => ({
    header: {
        menus: [
            {
                id: 1,
                text: "Anasayfa",
                href: "https://caliskanari.com/",
                subMenus: []
            },
            {
                id: 2,
                text: "Çalışkan Arı",
                href: "https://caliskanari.com.tr/",
                subMenus: [
                    { id: 1, text: "Çalışkan Arı Kütüphane", href: "https://caliskanari.com.tr/online-kutuphane/" }
                ]
            },
            {
                id: 3,
                text: "Küçük Arılar",
                href: "https://kucukarilarakademisi.com/",
                subMenus: [
                    { id: 1, text: "Küçük Arılar Kütüphane", href: "https://kucukarilarakademisi.com/index.php/online-kutuphane/" }
                ]
            },
            {
                id: 4,
                text: "Heyday English",
                href: "https://heydayenglish.com/",
                subMenus: []
            },
            {
                id: 5,
                text: "İletişim",
                href: "https://caliskanari.com/contact-us/",
                subMenus: []
            },
            {
                id: 6,
                text: "Beğendiklerim",
                href: "https://caliskanari.com/wishlist/",
                subMenus: []
            },
            {
                id: 7,
                text: "Çalışkan Arı 1. Sınıf",
                href: "https://caliskanari.com/1-sinif/",
                subMenus: []
            },
            {
                id: 8,
                text: "Giriş / Kayıt",
                href: "https://caliskanari.com/my-account/edit-account/",
                subMenus: []
            }
        ]
    },
    footer: {
        copyright: "Tüm hakları saklıdır. Caliskanari © 2024"
    },
    // Yeni menü eklemek için
    addMenu: (newMenu) => set(state => ({
        header: {
            ...state.header,
            menus: [...state.header.menus, newMenu]
        }
    })),
    // Menüyü kaldırmak için
    removeMenu: (index) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.filter((menu, i) => i !== index)
        }
    })),
    // Menü metnini güncellemek için
    setMenuText: (index, newText) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.map((menu, i) => i === index ? { ...menu, text: newText } : menu)
        }
    })),
    // Menü href'ini güncellemek için
    setMenuHref: (index, newHref) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.map((menu, i) => i === index ? { ...menu, href: newHref } : menu)
        }
    })),
    // Alt menü eklemek için
    addSubMenu: (menuIndex, newSubMenu) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.map((menu, i) => {
                if (i === menuIndex) {
                    return {
                        ...menu,
                        subMenus: [...menu.subMenus, newSubMenu]
                    };
                }
                return menu;
            })
        }
    })),
    // Alt menüyü kaldırmak için
    removeSubMenu: (menuIndex, subMenuIndex) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.map((menu, i) => {
                if (i === menuIndex) {
                    return {
                        ...menu,
                        subMenus: menu.subMenus.filter((subMenu, j) => j !== subMenuIndex)
                    };
                }
                return menu;
            })
        }
    })),
    // Alt menü metnini güncellemek için
    setSubMenuText: (menuIndex, subMenuIndex, newText) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.map((menu, i) => {
                if (i === menuIndex) {
                    return {
                        ...menu,
                        subMenus: menu.subMenus.map((subMenu, j) => j === subMenuIndex ? { ...subMenu, text: newText } : subMenu)
                    };
                }
                return menu;
            })
        }
    })),
    // Alt menü href'ini güncellemek için
    setSubMenuHref: (menuIndex, subMenuIndex, newHref) => set(state => ({
        header: {
            ...state.header,
            menus: state.header.menus.map((menu, i) => {
                if (i === menuIndex) {
                    return {
                        ...menu,
                        subMenus: menu.subMenus.map((subMenu, j) => j === subMenuIndex ? { ...subMenu, href: newHref } : subMenu)
                    };
                }
                return menu;
            })
        }
    })),
    // Menülerin sırasını değiştirmek için
    reorderMenus: (startIndex, endIndex) => set(state => {
        const menus = Array.from(state.header.menus);
        const [removed] = menus.splice(startIndex, 1);
        menus.splice(endIndex, 0, removed);

        return {
            header: {
                ...state.header,
                menus
            }
        };
    })
}));

export default headerStore;
