import create from 'zustand';

const useStore = create((set) => ({
    header: {
        menuItems: [
            { id: 1, text: "Anasayfa", href: "https://caliskanari.com/" },
            { id: 2, text: "Çalışkan Arı", href: "https://caliskanari.com.tr/" },
            { id: 3, text: "Küçük Arılar", href: "https://kucukarilarakademisi.com/" },
            { id: 4, text: "Heyday English", href: "https://heydayenglish.com/" },
            { id: 5, text: "İletişim", href: "https://caliskanari.com/contact-us/" },
            { id: 6, text: "Beğendiklerim", href: "https://caliskanari.com/wishlist/" },
            { id: 7, text: "Çalışkan Arı 1. Sınıf", href: "https://caliskanari.com/1-sinif/" },
            { id: 8, text: "Giriş / Kayıt", href: "https://caliskanari.com/my-account/edit-account/" }
        ]
    },
    footer: {
        
    },
    // Header'a yeni bir öğe eklemek için
    addMenuItem: (newItem) => set(state => ({
        header: {
            ...state.header,
            menuItems: [...state.header.menuItems, newItem]
        }
    })),
    // Header'dan bir öğe silmek için
    removeMenuItem: (index) => set(state => ({
        header: {
            ...state.header,
            menuItems: state.header.menuItems.filter((item, i) => i !== index)
        }
    })),
    // Header metni güncellemek için
    setMenuItemText: (index, newText) => set(state => ({
        header: {
            ...state.header,
            menuItems: state.header.menuItems.map((item, i) => i === index ? { ...item, text: newText } : item)
        }
    })),
    // Header'a item href'i güncellemek için
    setMenuItemHref: (index, newHref) => set(state => ({
        header: {
            ...state.header,
            menuItems: state.header.menuItems.map((item, i) => i === index ? { ...item, href: newHref } : item)
        }
    }))
}));

export default useStore;
