"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaCheck, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAPI } from "@/services/fetchAPI";

function CategoryProducts() {
  const [urunler, setUrunler] = useState([]); // Ürünler için state
  const [selectedClass, setSelectedClass] = useState("1.SINIF"); // Seçili sınıf filtresi için state
  const [selectedCategory, setSelectedCategory] = useState(""); // Seçili kategori filtresi için state
  const [dropdownOpen, setDropdownOpen] = useState({}); // Dropdown açılış durumu için state
  const [cart, setCart] = useState([]); // Sepet ürünleri için state
  const [imageMap, setImageMap] = useState({}); // Resim eşleştirmeleri için state

  // Komponent yüklendiğinde API'den ürünleri getir ve resim eşleştirmelerini oluştur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAPI("/products");
        const filteredData = data.data.filter((urun) => urun.STKOZKOD1 === "A"); // STKOZKOD1 === "A" olan ürünleri filtrele
        setUrunler(
          filteredData.map((urun) => ({
            ...urun,
            quantity: 0,
            addingToCart: false,
          }))
        );

        // Resim verilerini al
        const imageResponse = await fetch("/data.json");
        const imageData = await imageResponse.json();

        // Resim eşleştirmelerini oluştur
        const imgMap = {};
        imageData.forEach((item) => {
          imgMap[item.stkkod] = item.path;
        });
        setImageMap(imgMap);
      } catch (error) {
        console.error("Veri çekme hatası: ", error);
      }
    };

    fetchData();
  }, []);

  // Komponent yüklendiğinde local storage dan sepeti al
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Sepet durumu değiştiğinde local storegadaki sepeti güncelle
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(storedCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Sistemdeki sınıf kategorileri
  const classes = [
    "1.SINIF",
    "2.SINIF",
    "3.SINIF",
    "4.SINIF",
    "ANASINIFI",
    "İNGİLİZCE",
  ];
  // Seçilen sınıf tipine göre kategorileri getir
  const getClassCategories = (classType) => {
    // Sınıf tipine göre filtrelenmiş ürünleri al ve boş kategorileri hariç tut
    const filteredUrunler = urunler.filter(
      (urun) => urun.STKOZKOD3 === classType && urun.STKOZKOD2.trim() !== ""
    );
    // Benzersiz kategorileri çıkar
    const categories = [
      ...new Set(filteredUrunler.map((urun) => urun.STKOZKOD2)),
    ].filter(Boolean);
    return categories;
  };

  // Sınıf kategori dropdown'unu aç/kapat
  const toggleDropdown = (classType) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [classType]: !prevState[classType],
    }));
  };

  // Sepete ürün ekleme işlemi
  const handleAddToCart = async (values, urun) => {
    try {
      setUrunler((prevUrunler) =>
        prevUrunler.map((item) =>
          item.STKKOD === urun.STKKOD ? { ...item, addingToCart: true } : item
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUrunler = urunler.map((item) =>
        item.STKKOD === urun.STKKOD
          ? {
              ...item,
              quantity: item.quantity + values.quantity,
              addingToCart: false,
            }
          : item
      );
      setUrunler(updatedUrunler);

      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.STKKOD === urun.STKKOD
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += values.quantity;
      } else {
        updatedCart.push({
          ...urun,
          quantity: values.quantity,
          imagePath:
            imageMap[urun.STKKOD] ||
            "https://caliskanari.com/wp-content/uploads/2022/11/X7-420x420.png.webp",
        });
      }

      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      toast.success("Ürün sepete eklendi.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Sepete ekleme hatası: ", error);
      toast.error("Ürün sepete eklenirken bir hata oluştu.");
    }
  };

  // Ürünün sepette olup olmadığını kontrol et
  const isInCart = (urun) => {
    return cart.some((item) => item.STKKOD === urun.STKKOD);
  };

  // Kitapları render et
  const renderBooks = () => {
    let filteredUrunler = urunler.filter(
      (urun) => urun.STKOZKOD3 === selectedClass
    );

    // ANASINIFI ve İNGİLİZCE dışında bir sınıf seçildiyse
    if (selectedClass !== "ANASINIFI" && selectedClass !== "İNGİLİZCE") {
      if (selectedCategory === "hepsi") {
      } else if (selectedCategory === "empty") {
        filteredUrunler = filteredUrunler.filter((urun) => !urun.STKOZKOD2);
      } else if (selectedCategory) {
        filteredUrunler = filteredUrunler.filter(
          (urun) => urun.STKOZKOD2 === selectedCategory
        );
      }
    }

    // İngilizce sınıfı seçildiğinde sadece STKOZKOD2 değeri "İNGİLİZCE" olan ürünler listelensin
    if (selectedClass === "İNGİLİZCE") {
      filteredUrunler = urunler.filter(
        (urun) => urun.STKOZKOD2 === "İNGİLİZCE"
      );
    }

    return (
      <div className="bg-white w-screen md:w-[600px] lg:w-[960px] xl:w-[1188px] pt-[30px] lg:pt-[80px]">
        <div className="mb-4 flex flex-col md:flex-row items-center justify-center ">
          {classes.map((classType) => (
            <div
              key={classType}
              className="mb-4 relative flex items-center justify-center "
            >
              <button
                onClick={() => {
                  setSelectedClass(classType);
                  setSelectedCategory("");
                }}
                className={`flex flex-row gap-5 items-center justify-center text-[14px] md:text-[12px] lg:text-[14px] font-bold rounded-full py-[22px] pr-[28px] pl-[28px] tracking-[1px] h-[40px] mx-[8px] mb-[8px] hover:scale-105 transition-all duration-500 ease-in-out transform cursor-pointer  ${
                  selectedClass === classType
                    ? " border-[3px] border-LightBlue text-LightBlue"
                    : "border-[3px] border-CategoriesTitle text-CategoriesTitle"
                }`}
              >
                {classType}
                {classType !== "ANASINIFI" && classType !== "İNGİLİZCE" && (
                  <span
                    onClick={() => {
                      toggleDropdown(classType);
                    }}
                    className="cursor-pointer"
                  >
                    <IoIosArrowDown className="w-5 h-5 hover:scale-110 transition-all duration-500 ease-in-out transform cursor-pointer hover:text-cyan-700" />
                  </span>
                )}
              </button>
              {dropdownOpen[classType] &&
                classType !== "ANASINIFI" &&
                classType !== "İNGİLİZCE" && (
                  <div className="absolute top-10 mt-2 w-36 rounded-2xl bg-white shadow-lg border border-gray-300 z-[1000]">
                    <div
                      className="p-2 hover:bg-LightBlue/25 hover:rounded-2xl hover:text-LightBlue duration-300 ease-in-out transform cursor-pointer"
                      onClick={() => {
                        setSelectedCategory("hepsi");
                        toggleDropdown(classType);
                      }}
                    >
                      GENEL
                    </div>
                    {getClassCategories(classType).map((category) => (
                      <div
                        key={category}
                        className="p-2 hover:bg-LightBlue/25 hover:rounded-2xl hover:text-LightBlue duration-300 ease-in-out transform cursor-pointer"
                        onClick={() => {
                          setSelectedCategory(category);
                          toggleDropdown(classType);
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center sm:mx-[35px] mb-[30px] px-[15px] w-auto">
          {filteredUrunler.map((urun) => (
            <div
              key={urun.STKKOD}
              className="relative p-[10px] sm:p-[20px] border border-ProductsBorder rounded-md shadow-sm transition duration-300 ease-in-out transform hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-row sm:flex-col items-center sm:justify-center"
            >
              {urun.discount && (
                <p className="absolute flex flex-col items-center justify-center top-16 -right-12 transform origin-top-right rotate-45 text-[12px] sm:text-[16px] font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-600 px-2 w-40 shadow-md shadow-orange-200">
                  %{urun.discount}
                  <span>İNDİRİM</span>
                </p>
              )}

              {isInCart(urun) && (
                <p className="absolute flex flex-row items-center gap-2 top-0 left-0 transform  stext-[12px] sm:text-[16px] font-bold text-CustomRed py-2 px-4 z-1000 bg-white rounded-md">
                  <FaShoppingCart className="" />
                  <span>Sepette</span>
                </p>
              )}
              <div className="w-2/5 sm:w-full mr-[10px] sm:mr-0">
                <span className="flex items-center justify-center">
                  <Image
                    src={
                      imageMap[urun.STKKOD]
                        ? imageMap[urun.STKKOD]
                        : "https://caliskanari.com/wp-content/uploads/2022/11/X7-420x420.png.webp"
                    }
                    alt={urun.STKCINSI}
                    className="object-cover w-[140px] md:w-[210px] h-[140px] md:h-[210px]"
                    width={210}
                    height={210}
                  />
                </span>
              </div>
              <div className="w-3/5 sm:w-full flex flex-col justify-between">
                <div className={`text-left md:pt-[15px] min-h-12 md:min-h-20 `}>
                  <Link
                    href={`/products/${urun.STKKOD}`}
                    className="font-bold text-[14px] md:text-[16px] text-CustomGray leading-tight"
                  >
                    <p>{urun.STKCINSI}</p>
                  </Link>
                </div>
                <div className="flex-none">
                  <div>
                    {urun.STKOZKOD5 && (
                      <p className="italic text-LightBlue text-[20px] md:text-[23px] sm:pt-[20px] font-semibold">
                        <span>₺</span>
                        {urun.STKOZKOD5}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex mt-[20px]">
                  <Formik
                    initialValues={{ quantity: 1 }}
                    validationSchema={Yup.object().shape({
                      quantity: Yup.number()
                        .min(1, "En az 1 olmalı")
                        .required("Zorunlu alan"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                      handleAddToCart(values, urun);
                      resetForm();
                    }}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                    }) => (
                      <Form>
                        <div className="flex flex-col items-center justify-center text-LightBlue">
                          <div className="flex flex-row items-center justify-center">
                            <div className="flex items-center mt-2">
                              <button
                                type="button"
                                className="text-sm sm:text-md text-LightBlue hover:scale-110 transition duration-500 ease-in-out transform"
                                onClick={() => {
                                  if (values.quantity > 1) {
                                    handleChange({
                                      target: {
                                        name: "quantity",
                                        value: values.quantity - 1,
                                      },
                                    });
                                  }
                                }}
                              >
                                <FaMinus />
                              </button>
                              <Field
                                min="1"
                                name="quantity"
                                className="w-6 text-center outline-none text-CustomGray"
                              />
                              <button
                                type="button"
                                className="text-LightBlue hover:scale-110 text-sm sm:text-md transition duration-500 ease-in-out transform"
                                onClick={() =>
                                  handleChange({
                                    target: {
                                      name: "quantity",
                                      value: values.quantity + 1,
                                    },
                                  })
                                }
                              >
                                <FaPlus />
                              </button>
                            </div>
                            {errors.quantity && touched.quantity && (
                              <div className="text-red-500 mt-1">
                                {errors.quantity}
                              </div>
                            )}
                            <button
                              type="submit"
                              className="flex flex-row items-center justify-center gap-2 ml-2 sm:ml-4 lg:ml-2 text-white font-bold hover:scale-105 transition-all transform easy-in-out duration-500 cursor-pointer bg-LightBlue/75 pl-2 pr-9 py-2 rounded-full relative w-[130px] sm:w-[160px] h-[40px] text-[13px] sm:text-[15px]"
                              onClick={handleSubmit}
                              disabled={urun.addingToCart}
                            >
                              {urun.addingToCart ? (
                                <div className="flex flex-row items-center justify-center gap-1">
                                  <div className="h-2 w-2 rounded-full animate-pulse bg-blue-900"></div>
                                  <div className="h-2 w-2 rounded-full animate-pulse bg-blue-900"></div>
                                  <div className="h-2 w-2 rounded-full animate-pulse bg-blue-900"></div>
                                </div>
                              ) : (
                                <>Sepete Ekle</>
                              )}
                              <span
                                className={`absolute -top-1 -right-2 text-white bg-gradient-to-r from-sky-600 to-cyan-700 p-3 border-4 border-white rounded-full transition-all duration-500 ease-out transform`}
                              >
                                {isInCart(urun) ? (
                                  <FaCheck
                                    className={`transition-all duration-1000 ease-in-out transform ${
                                      isInCart(urun) ? "scale-100" : "scale-0"
                                    }`}
                                  />
                                ) : (
                                  <FaPlus />
                                )}
                              </span>
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div>{renderBooks()}</div>;
}

export default CategoryProducts;
