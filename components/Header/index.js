"use client"
import React from 'react';
import useStore from '@/utils/store';
import Link from "next/link";

const Header = () => {
    const { header, addMenuItem, removeMenuItem, setMenuItemText, setMenuItemHref } = useStore();

    // // Yeni bir menü öğesi eklemek
    // const handleAddMenuItem = () => {
    //     const newItem = { id: Math.random(), text: "Yeni Öğe", href: "#" }; // Yeni öğe örnek değerlerle
    //     addMenuItem(newItem);
    // };

    // // Bir menü öğesi silmek
    // const handleRemoveMenuItem = (index) => {
    //     removeMenuItem(index);
    // };

    // // Menü öğesi metnini güncelleme
    // const handleMenuItemTextChange = (index, newText) => {
    //     setMenuItemText(index, newText);
    // };

    // // Menü öğesi href'ini güncelleme
    // const handleMenuItemHrefChange = (index, newHref) => {
    //     setMenuItemHref(index, newHref);
    // };

    return (
        <div className="h-[45px] bg-DarkBlue">
            <div className="px-[15px] mx-[35px]  text-white">
                <ul className="flex flex-row text-[14px] font-semibold">
                    {header.menuItems.map((menuItem, index) => (
                        <li key={menuItem.id} className="mr-[25px] leading-[45px]">
                            <Link href={menuItem.href}>{menuItem.text}</Link>
                            {/* <button onClick={() => handleRemoveMenuItem(index)}>
                                Sil
                            </button>
                            <button onClick={() => handleMenuItemTextChange(index, "Yeni Metin")}>
                                Metni Güncelle
                            </button>
                            <button onClick={() => handleMenuItemHrefChange(index, "yeni-link")}>
                                Linki Güncelle
                            </button> */}
                        </li>
                    ))}
                    {/* <li>
                        <button onClick={handleAddMenuItem}>
                            Yeni Öğe Ekle
                        </button>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Header;