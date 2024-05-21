"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";
import categoryStore from "@/utils/categoryStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { RiShoppingCartLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ShoppingCart = () => {
  const initialCartItems = () => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  };
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [updating, setUpdating] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Sepetteki ürünleri alma
    const product = cartItems.find((item) => item.id === itemId);
    if (!product) {
      return;
    }
    // Yeni miktarın mevcut stoktan fazla olup olmadığını kontrol etme
    if (newQuantity > product.stock) {
      toast.error(`Stok miktarını aşıyorsunuz (${product.stock} adet var)`);
      return;
    }

    setUpdating(true); // Güncelleme başladığında true
    setUpdatingItems({ ...updatingItems, [itemId]: true });

    setTimeout(() => {
      setUpdating(false); // 5 saniye sonra false
      setUpdatingItems({ ...updatingItems, [itemId]: false });

      // Ürün miktarını güncelleme işlemi
      const updatedCartItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      // Güncellenmiş sepeti state'e ve Local Storage'a kaydetme
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      if (updatedCartItems) {
        toast.success("Ürün adediniz başarıyla güncellendi");
      } else {
        toast.error("Ürün adediniz güncellenemedi");
      }
    }, 5000);
  };

  const initiateDelete = (itemId) => {
    setItemToDelete(itemId);
    setConfirmDelete(true);
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setItemToDelete(null);
  };

  const confirmDeleteItem = () => {
    handleItemDelete(itemToDelete);
    setConfirmDelete(false);
    setItemToDelete(null);
  };

  const handleItemDelete = (itemId) => {
    // Ürünü sepetten kaldırma
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setTimeout(() => {
      toast.success("Ürün sepetten kaldırıldı", {});
    }, 500);
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

  //genel toplam
  const totalPrice = uniqueCartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(",", "."));
    return total + itemPrice * item.quantity;
  }, 0);

  //iskonto tutarı
  const totalDiscount = uniqueCartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(",", "."));
    const discountedPrice = calculateDiscountedPrice(itemPrice, item.discount);
    return total + (itemPrice - discountedPrice) * item.quantity;
  }, 0);

  //sepet tutarı
  const totalAmountAfterDiscount = totalPrice - totalDiscount;

  //ödeme yöntemi
  // const [selectedMethod, setSelectedMethod] = useState(null);
  // const paymentMethods = [
  //   { id: 1, icon: "FaMoneyBillTransfer" },
  //   { id: 2, icon: "FaCcMastercard" },
  //   { id: 3, icon: "GiWallet" },
  // ];

  return (
    <div
      id="shoppingcart"
      className="bg-white flex items-center flex-col py-[35px] sm:py-[60px] w-screen lg:w-[1188px] "
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
        <div className="px-5 sm:px-0">
          <table className=" px-5 py-3 text-[12px] md:text-[14px] lg:text-[16px] mx-auto sm:mx-0  shadow-lg rounded-md">
            <thead className=" px-5 py-3 bg-DarkBlue text-white tracking-wide ">
              <tr>
                <th className="px-5 py-3 ">
                  <span className="flex items-center justify-center">
                    <IoMdImages className="w-6 h-6 " />
                  </span>
                </th>
                <th className="px-5 py-3">
                  <p className="flex items-center justify-center">Ürün Adı</p>
                </th>
                <th className="px-5 py-3 hidden lg:table-cell">Birim</th>
                <th className=" px-5 py-3 hidden lg:table-cell">İsk.</th>
                <th className=" px-5 py-3">Net</th>
                <th className=" px-5 py-3 hidden lg:table-cell">Stok</th>
                <th className=" px-5 py-3">
                  <p className="flex justify-center ">Adet</p>
                </th>
                <th className="px-3 sm:px-5 py-3">
                  <span className="flex items-center justify-center">
                    <BsThreeDotsVertical className="w-5 h-5" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueCartItems.map((item) => (
                <tr key={item.id} className="shadow-sm">
                  <td className=" px-2 sm:px-5 py-5  ">
                    <div className="flex flex-col sm:flex-row items-center text-center">
                      <Image
                        src={item.imagesrc}
                        alt={item.name}
                        width={70}
                        height={70}
                      />
                    </div>
                  </td>
                  <td className=" px-2 sm:px-5 py-3 ">
                    <div className="flex flex-col sm:flex-row items-center ">
                      <Link
                        href={item.link}
                        className="w-[70px] sm:w-full text-LightBlue font-medium"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <td className=" px-5 py-3  hidden lg:table-cell">
                    <span className="flex items-center justify-center">
                      ₺{item.price}
                    </span>
                  </td>
                  <td className=" px-5 py-3 hidden lg:table-cell">
                    <span className="flex items-center justify-center">
                      {item.discount ? `%${item.discount},00` : "%0"}
                    </span>
                  </td>
                  <td className=" px-2 sm:px-5 py-3 ">
                    <span className="flex items-center justify-center">
                      ₺
                      {calculateDiscountedPrice(
                        item.price.replace(",", "."),
                        item.discount
                      )}{" "}
                    </span>
                  </td>
                  <td className=" px-5 py-3  hidden lg:table-cell">
                    <span className="flex items-center justify-center ">
                      {getProductStock(item.id)}
                    </span>
                  </td>
                  <td className=" px-2 sm:px-5 py-3 ">
                    <span className="flex items-center justify-center">
                      <Formik
                        initialValues={{ quantity: item.quantity }}
                        onSubmit={({ quantity }) =>
                          handleQuantityChange(item.id, quantity)
                        }
                      >
                        {({ values, handleChange }) => (
                          <Form className="flex items-center">
                            <div className="border border-CustomGray/25 rounded-full py-2 px-2 flex flex-row items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const newValue = values.quantity - 1;
                                  if (newValue >= 1) {
                                    handleChange({
                                      target: {
                                        name: "quantity",
                                        value: newValue,
                                      },
                                    });
                                  }
                                }}
                                className="text-sm sm:text-xl text-LightBlue hover:scale-110 transition duration-500 ease-in-out transform"
                                disabled={updatingItems[item.id]}
                              >
                                <AiOutlineMinus />
                              </button>
                              <Field
                                name="quantity"
                                value={values.quantity}
                                min={1}
                                max={item.stock}
                                onChange={handleChange}
                                className="w-6 sm:w-12 p-1 text-center outline-none"
                                disabled={updatingItems[item.id]}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newValue = values.quantity + 1;
                                  if (newValue <= item.stock) {
                                    handleChange({
                                      target: {
                                        name: "quantity",
                                        value: newValue,
                                      },
                                    });
                                  }
                                }}
                                className="text-sm sm:text-xl text-LightBlue hover:scale-110 transition duration-500 ease-in-out transform"
                                disabled={updatingItems[item.id]}
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                            <button
                              className={`${
                                values.quantity !== item.quantity
                                  ? "bg-LightBlue text-white hover:scale-105 transition-all duration-700 transform ease-in-out hover:bg-LightBlue"
                                  : "bg-CustomGray  text-white cursor-not-allowed"
                              } px-4 ml-2 py-2 rounded-md sm:ml-[24px] w-[101px] h-[40px]`}
                              type="submit"
                              disabled={
                                updatingItems[item.id] ||
                                values.quantity === item.quantity
                              }
                            >
                              {updatingItems[item.id] ? (
                                <div className="flex flex-row items-center justify-center gap-1 ">
                                  <div className="h-2 w-2 rounded-full animate-pulse bg-DarkBlue"></div>
                                  <div className="h-2 w-2 rounded-full animate-pulse bg-DarkBlue"></div>
                                  <div className="h-2 w-2 rounded-full animate-pulse bg-DarkBlue"></div>
                                </div>
                              ) : (
                                "Güncelle"
                              )}
                            </button>
                            <button
                              className="flex sm:hidden items-center justify-center w-[20px] ml-2"
                              type="submit"
                              disabled={updating}
                            >
                              {updatingItems[item.id] ? (
                                <div className="flex flex-row items-center justify-center gap-1 ">
                                  <div className="h-1 w-1 rounded-full animate-pulse bg-LightBlue"></div>
                                  <div className="h-1 w-1 rounded-full animate-pulse bg-LightBlue"></div>
                                  <div className="h-1 w-1 rounded-full animate-pulse bg-LightBlue"></div>
                                </div>
                              ) : (
                                <RxUpdate className="w-4 h-4 text-LightBlue" />
                              )}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </span>
                  </td>

                  <td className=" px-2 sm:px-5 py-3 text-center">
                    <button
                      className="flex items-center justify-center"
                      onClick={() => initiateDelete(item.id)}
                    >
                      <MdDeleteForever className="w-7 h-7 fill-BasketRed hover:fill-red-500 hover:scale-110 transition-all duration-500 transform ease-in-out " />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center mt-24">
            {/* <div className="w-full lg:w-1/2 ">
              <OrderInformation />
            </div> */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="flex flex-col items-center ">
                <div className="flex flex-col items-center justify-center bg-slate-100 w-[350px] sm:w-[450px] rounded-2xl shadow-lg p-10">
                  <div className="flex items-center justify-end">
                    {" "}
                    <h1 className="text-[20px] md:text-[32px] font-bold text-CustomGray flex items-center justify-center ">
                      Sipariş Özeti
                    </h1>
                  </div>
                  <div className="border-b border-slate-200 mb-8">
                    {/* <h1 className="text-[18px] md:text-[20px] font-bold text-CustomGray mt-6 flex items-start px-4">
                      Ödeme Yöntemi
                    </h1>
                    <div className="flex flex-wrap gap-4 px-4 pb-8 pt-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`relative cursor-pointer p-2 border-2 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:border-LightBlue 
        ${
          selectedMethod === method.id ? "border-LightBlue" : "border-gray-300"
        }`}
                        >
                          {method.icon === "FaMoneyBillTransfer" && (
                            <FaMoneyBillTransfer className="w-12 md:w-16 h-12 md:h-16" />
                          )}
                          {method.icon === "FaCcMastercard" && (
                            <FaCcMastercard className="w-12 md:w-16 h-12 md:h-16" />
                          )}
                          {method.icon === "GiWallet" && (
                            <GiWallet className="w-12 md:w-16 h-12 md:h-16" />
                          )}
                          {selectedMethod === method.id && (
                            <div className="absolute -top-2 -right-2 bg-LightBlue text-white rounded-full p-1">
                              <FaCheck />
                            </div>
                          )}
                        </div>
                      ))}
                    </div> */}
                  </div>

                  <div className="flex justify-center sm:justify-end mb-12 text-[16px]">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-12 border-b border-slate-200 py-4">
                        <p className="w-[100px] flex justify-start font-bold text-CustomGray">
                          <span className="">Ara Toplam</span>
                        </p>
                        <p className="w-[100px] flex justify-end font-bold text-CustomGray">
                          <span className="">₺{totalPrice.toFixed(2)} </span>
                        </p>
                      </div>
                      <div className="flex flex-row gap-12">
                        <p className="w-[100px] flex justify-start font-medium text-slate-400">
                          <span className="">İndirim</span>
                        </p>
                        <p className="w-[100px] flex justify-end font-medium text-slate-400">
                          <span className="">₺{totalDiscount.toFixed(2)}</span>
                        </p>
                      </div>
                      <div className="flex flex-row gap-12 ">
                        <p className="w-[100px] flex justify-start font-medium text-slate-400">
                          <span className="">KDV</span>
                        </p>
                        <p className="w-[100px] flex justify-end font-medium text-slate-400">
                          <span className="">₺0,00 </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-12 text-[24px] mb-12">
                    <p className="w-[150px] flex justify-start font-extrabold text-CustomGray">
                      <span className="">Toplam</span>
                    </p>
                    <p className="w-[100px] flex justify-end font-extrabold text-CustomGray">
                      <span className="">
                        ₺{totalAmountAfterDiscount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-5">
                    <div className="group">
                      <button
                        type="submit"
                        className="flex flex-row items-center justify-center gap-2 ml-3 text-white font-bold hover:scale-105 transition-all transform ease-out duration-500 cursor-pointer bg-gradient-to-r from-LightBlue to-sky-700 pl-3 pr-11 py-2 rounded-full relative w-[250px] h-[58px] text-[18px]"
                      >
                        Sipariş Ver
                        <span className="absolute -top-1 -right-2 text-white bg-gradient-to-r from-sky-700 to-LightBlue p-4 border-4 border-white rounded-full transition-all duration-500 ease-out transform group-hover:scale-110">
                          <RiShoppingCartLine className="w-6 h-6" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      {confirmDelete && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center `}
        >
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-20 mx-5 sm:mx-0 flex flex-col items-center justify-center gap-3">
            <span>
              <GiCancel className="fill-BasketRed w-12 h-12" />
            </span>
            <p className="text-lg font-semibold my-4 text-center text-CustomGray">
              Silmek istediğinizden emin misiniz?
            </p>
            <div className="flex justify-center items-center gap-12">
              <button
                className="px-6 py-3 mr-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-500 ease-in-out transform hover:scale-105"
                onClick={cancelDelete}
              >
                Hayır
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-500 ease-in-out transform hover:scale-105"
                onClick={confirmDeleteItem}
              >
                Evet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
