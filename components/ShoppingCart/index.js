"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Image from "next/image";

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

  return (
    <div  id="shoppingcart"
    className="bg-white   w-[1188px] h-screen" >
      <h1>Sepetim</h1>
      {uniqueCartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <ul>
          {uniqueCartItems.map((item) => (
            <li key={item.id}>
                            {/* <Image src={item.imagesrc} alt={item.name} width={600} height={600} />  */}

              {item.name} - {item.price}
              <Formik
              key={JSON.stringify(item)}
                initialValues={{ quantity: item.quantity }}
                onSubmit={(values, { resetForm }) => {
                  handleQuantityChange(item.id, values.quantity);
                  resetForm();
                }}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <Field
                      type="number"
                      name="quantity"
                      min="1"
                      value={values.quantity}
                      onChange={handleChange}
                    />
                    <button type="submit">Güncelle</button>
                  </Form>
                )}
              </Formik>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
