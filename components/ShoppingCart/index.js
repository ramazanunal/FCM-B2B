"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";
import categoryStore from "@/utils/categoryStore";
import OrderInformation from "../OrderInformation";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    // Ürün miktarını güncelleme
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Güncellenmiş sepeti state'e ve Local Storage'a kaydetme
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleItemDelete = (itemId) => {
    // Ürünü sepetten kaldırma
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    // Her cartItems değiştiğinde Local Storage'ı güncelleme
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ürünleri benzersiz olarak filtreleme
  const uniqueCartItems = cartItems.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  //iskonto oranı için fonksiyon
  const calculateDiscountedPrice = (price, discount) => {
    if (discount && discount > 0) {
      const discountedAmount = (price * discount) / 100;
      return (price - discountedAmount).toFixed(2);
    }
    return price;
  };

  //stok bilgisini storedan almak için fonksiyon
  const getProductStock = (productId) => {
    // productId'ye göre ürünü categoryStore'dan bul ve stok miktarını döndür
    const product = categoryStore
      .getState()
      .categories.flatMap((category) => category.products)
      .find((product) => product.id === productId);
    return product ? product.stock : 0; // Eğer ürün bulunamazsa 0 döndür
  };

  return (
    <div
      id="shoppingcart"
      className="bg-white flex items-center flex-col py-[60px] w-[1188px] "
    >
      <div className="flex items-center justify-center text-[35px] md:text-[48px] text-CustomGray leading-[41px] font-bold italic mb-[45px]">
        Sepet
      </div>
      {uniqueCartItems.length === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <span className="flex items-center justify-center my-[20px]">
            <TbShoppingCartX className="w-[140px] h-[140px] text-CustomGray" />
          </span>
          <span className="text-[20px] text-CustomGray font-bold my-[20px]">
            Sepetiniz şu anda boş.
          </span>
          <Link href={"https://caliskanari.com/shop/"}>
            <button className="bg-LightBlue text-white px-[24px] py-[10px] rounded-md font-bold text-[14px] mt-[50px] mb-[15px] hover:scale-105 transition-all duration-500 transform ease-in-out hover:bg-LightBlue/50">
              Mağazaya geri dön
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <table className="border border-slate-100 px-5 py-3">
            <thead className="border border-slate-100 px-5 py-3">
              <tr>
                <th className="border border-slate-100 px-5 py-3  ">
                  <p className="flex jutify-start">Ürün Adı</p>
                </th>
                <th className="border border-slate-100 px-5 py-3">Birim</th>
                <th className="border border-slate-100 px-5 py-3">İsk.</th>
                <th className="border border-slate-100 px-5 py-3">Net</th>
                <th className="border border-slate-100 px-5 py-3 ">Stok</th>
                <th className="border border-slate-100 px-5 py-3">
                  <p className="flex jutify-start">Adet</p>
                </th>
                <th className="border border-slate-100 px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {uniqueCartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-slate-100 px-5 py-3 ">
                    <div className="flex flex-row items-center ">
                      <Image
                        src={item.imagesrc}
                        alt={item.name}
                        width={60}
                        height={60}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="border border-slate-100 px-5 py-3  ">
                    <span className="flex items-center justify-center">
                      {item.price} TL{" "}
                    </span>
                  </td>
                  <td className="border border-slate-100 px-5 py-3 ">
                    <span className="flex items-center justify-center">
                      {item.discount ? `%${item.discount},00` : "%0"}
                    </span>
                  </td>
                  <td className="border border-slate-100 px-5 py-3 ">
                    <span className="flex items-center justify-center">
                      {calculateDiscountedPrice(
                        item.price.replace(",", "."),
                        item.discount
                      )}{" "}
                      TL
                    </span>
                  </td>
                  <td className="border border-slate-100 px-5 py-3 bg-BasketRed">
                    <span className="flex items-center justify-center ">
                      {getProductStock(item.id)}
                    </span>
                  </td>
                  <td className="border border-slate-100 px-5 py-3 bg-BasketRed">
                    <span className="flex items-center justify-center">
                      <Formik
                        key={JSON.stringify(item)}
                        initialValues={{ quantity: item.quantity }}
                        onSubmit={(values, { resetForm }) => {
                          handleQuantityChange(item.id, values.quantity);
                          resetForm();
                        }}
                      >
                        {({ values, handleChange }) => (
                          <Form className="flex flex-row items-center ">
                            <Field
                              type="number"
                              name="quantity"
                              min="1"
                              value={values.quantity}
                              onChange={handleChange}
                              className="text-center w-16 h-10 border rounded-md border-slate-200 hover:border-CustomGray transition duration-500 ease-in-out transform outline-none"
                            />
                            <button
                              className="flex items-center justify-center bg-slate-200 font-semibold	py-2 px-4 rounded-md ml-[24px] hover:scale-105 transition-all duration-500 transform ease-in-out hover:bg-slate-300"
                              type="submit"
                            >
                              Güncelle
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </span>
                  </td>

                  <td className="border border-slate-100 px-5 py-3">
                    <button
                      className="flex items-center justify-center bg-BasketRed text-white font-semibold	p-2 rounded-md hover:scale-105 transition-all duration-500 transform ease-in-out hover:bg-CustomRed"
                      onClick={() => handleItemDelete(item.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderInformation/>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
