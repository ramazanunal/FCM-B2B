"use client"
import { useState, useEffect } from "react";

const useCartItemCount = () => {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const itemCount = cartItems.length;
        setCartItemCount(itemCount);
    }, []); // Boş bağımlılık dizisi, bu etkinin yalnızca bir kez, bileşen bağlandığında çalışmasını sağlar
  
    return [cartItemCount, setCartItemCount]; // State'i ve state'i güncellemek için fonksiyonu döndür
};

export default useCartItemCount;
