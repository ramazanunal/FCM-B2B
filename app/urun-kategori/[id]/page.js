"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import headerStore from "@/utils/headerStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

function SubProductsList({ params }) {
  const subMenuProductsId = parseInt(params.id);
  const { header } = headerStore();

  const findProductsById = (id) => {
    let products = [];
    header.mainMenuItems.forEach((menuItem) => {
      menuItem.subMenus.forEach((subMenu) => {
        if (subMenu.id === id) {
          products = subMenu.products;
        }
      });
    });
    return products;
  };

  const foundProducts = findProductsById(subMenuProductsId);

  const calculateDiscountedPrice = (price, discount) => {
    if (discount && discount > 0) {
      const discountedAmount = (price * discount) / 100;
      return (price - discountedAmount).toFixed(2);
    }
    return price;
  };

  const addToCart = (product, quantity) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      const newItem = { ...product, quantity };
      cartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const event = new Event("cartChange");
    window.dispatchEvent(event);

    toast.success("Ürün sepete eklendi", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Alt menü metni
  const subMenuText = header.mainMenuItems
    .find((menuItem) =>
      menuItem.subMenus.some((subMenu) => subMenu.id === subMenuProductsId)
    )
    ?.subMenus.find((subMenu) => subMenu.id === subMenuProductsId)?.text;

  // Ana menü metni
  const mainMenuText = header.mainMenuItems.find((menuItem) =>
    menuItem.subMenus.some((subMenu) => subMenu.id === subMenuProductsId)
  )?.text;

  return (
    <div className="bg-white w-screen xl:w-[1188px] pt-[60px] pb-[80px]">
      <div className="flex flex-col  px-[30px] mb-[45px]">
        <h1 className="text-[48px] italic font-bold text-CustomGray mb-[45px]">
          {subMenuText}
        </h1>
        <div className="flex flex-row items-center text-[11px] text-[#9A9A9A] uppercase font-semibold tracking-[1px] gap-2">
          <Link href={"https://caliskanari.com/shop/"}>
            <p className="hover:scale-105 transition-all transform ease-in-out duration-500 hover:text-LightBlue">
              Mağaza
            </p>
          </Link>
          <span>
            <GoArrowRight />
          </span>
          <Link href={""}>
            <p className="hover:scale-105 transition-all transform ease-in-out duration-500 hover:text-LightBlue">
              {mainMenuText}
            </p>
          </Link>
          <span>
            <GoArrowRight />
          </span>
          <p>{subMenuText}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center sm:mx-[35px] mb-[30px] px-[15px]">
        {foundProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            calculateDiscountedPrice={calculateDiscountedPrice}
            addToCart={addToCart}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SubProductsList;
