import React, { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { mainCategory, subCategory, products } from "./data";
function ProductsFilter({
  filteredProducts,
  paginate,
  currentPage,
  productsPerPage,
  setFilteredProducts,
  selectedProducts,
  setSelectedProducts,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Ders Seçin");
  const [selectedProductType, setSelectedProductType] = useState(
    "Ürün tipine göre filtreleme"
  );
  const [selectedStock, setSelectedStock] = useState(
    "Stok durumuna göre filtreleme"
  );
  const [anyFilterSelected, setAnyFilterSelected] = useState(false);
  //Filtre temizleme fonksiyonu
  const handleClearFilters = () => {
    setSelectedCategory("Ders Seçin");
    setSelectedProductType("Ürün tipine göre filtreleme");
    setSelectedStock("Stok durumuna göre filtreleme");
    setAnyFilterSelected(false)
  };

  // Toplu filtreleme başlangıç
  useEffect(() => {
    handleFilters();
  }, [selectedCategory, selectedProductType, selectedStock]);

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
    setAnyFilterSelected(true)
    handleFilters();
  };

  const handleStock = (e) => {
    setSelectedStock(e.target.value);
    setAnyFilterSelected(true)
    handleFilters();
  };

  const handleProductType = (e) => {
    setSelectedProductType(e.target.value);
    setAnyFilterSelected(true)
    handleFilters();
  };
  const handleFilters = () => {
    let filteredProducts = [...products];
    if (selectedCategory !== "Ders Seçin") {
      filteredProducts = filteredProducts.filter(
        (item) => item.category.subCategory === selectedCategory
      );
    }
    if (selectedProductType !== "Ürün tipine göre filtreleme") {
      filteredProducts = filteredProducts.filter(
        (item) => item.category.mainCategory === selectedProductType
      );
    }
    if (selectedStock !== "Stok durumuna göre filtreleme") {
      if (selectedStock === "Stokta Olanlar") {
        filteredProducts = filteredProducts.filter(
          (item) => item.stokCount > 0
        );
      } else if (selectedStock === "Stokta Olmayanlar") {
        filteredProducts = filteredProducts.filter(
          (item) => item.stokCount === 0
        );
      }
    }
    setFilteredProducts(filteredProducts);
  };

  // Toplu filtreleme bitiş

  //toplu işlemlere göre filtreleme
  const handleAllFilter = (e) => {
    const selectIsActive = e.target.value;
    if (selectIsActive === "Toplu Islemler") {
      setFilteredProducts(products);
    } else {
      const filteredActiveProduct = products.filter(
        (item) => item.active.toString() === selectIsActive
      );
      setFilteredProducts(filteredActiveProduct);
    }
  };

  //aktif pasif yapma
  const handleIsActive = (e) => {
    const selectProduct = e.target.value;
    if (selectProduct !== "Durum İşlemi") {
      selectedProducts.map((product) => (product.active = selectProduct));
      const filteredActiveProduct = products.filter(
        (item) => item.active.toString() !== selectProduct
      );

      setFilteredProducts(filteredActiveProduct);
      setSelectedProducts([]);
      e.target.value = "Durum İşlemi";
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-3">
        <div className="flex gap-4 ">
          <div className="flex gap-2">
            <select
            className={`p-1 border rounded-md text-CustomGray w-64 ${selectedCategory !== "Ders Seçin" && "bg-LightBlue/80 text-white font-semibold"}`}
              name=""
              id=""
              onChange={handleAllFilter}
            >
              <option className="" hidden>
                Toplu Islemler
              </option>
              <option className="">Toplu Islemler</option>
              <option value={true}>Aktif Olan Ürünler</option>
              <option value={false}>Aktif Olmayan Ürünler</option>
            </select>
            <select
              className="p-1 border rounded-md text-CustomGray w-32"
              name=""
              id=""
              onChange={handleIsActive}
            >
              <option className="" hidden>
                Durum İşlemi
              </option>
              <option className="">Durum İşlemi</option>
              <option value={true}>Ürünü Aktif Yap</option>
              <option value={false}>Ürünü Pasif Yap</option>
            </select>
          </div>

          <div className="flex gap-2 items-center  text-sm">
            <select
              className={`p-1 border rounded-md text-CustomGray w-30 ${selectedCategory !== "Ders Seçin" && "bg-LightBlue/80 text-white font-semibold"}`}
              name=""
              id=""
              onChange={handleCategory}
              value={selectedCategory}
            >
              <option hidden>Ders Seçin</option>

              <option>Ders Seçin</option>
              {subCategory.map((product, index) => (
                <option key={index} value={product} >
           {product}
                  
                </option>
              ))}
              
            </select>
           
            <select
            className={`p-1 border rounded-md text-CustomGray w-44 ${selectedProductType !== "Ürün tipine göre filtreleme" && "bg-LightBlue/80 text-white font-semibold"}`}
              name=""
              id=""
              onChange={handleProductType}
              value={selectedProductType}
            >
              <option hidden>Ürün tipine göre filtreleme</option>
              <option>Ürün tipine göre filtreleme</option>
              {mainCategory.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
            className={`p-1 border rounded-md text-CustomGray w-52 ${selectedStock !== "Stok durumuna göre filtreleme" && "bg-LightBlue/80 text-white font-semibold"}`}
              name=""
              id=""
              onChange={handleStock}
              value={selectedStock}
            >
              <option hidden>Stok durumuna göre filtreleme</option>
              <option>Stok durumuna göre filtreleme</option>
              <option>Stokta Olanlar</option>
              <option>Stokta Olmayanlar</option>
            </select>
         <button
              className={`p-1 font-[500] border  rounded-md  
                          ${anyFilterSelected ?"border-LightBlue hover:bg-LightBlue/60 hover:text-white" : "text-gray-400 border-gray-400 cursor-not-allowed"}
              `}
              onClick={handleClearFilters}
            >
              Filtre Temizle
            </button>
            

            
          </div>
        </div>
        <div className="flex items-center gap-2 text-DarkBlue ">
          <span className="text-CustomGray">
            {filteredProducts.length} Kitap
          </span>
          <div
          className={`${
            currentPage === 1
              ? "cursor-not-allowed text-gray-300 "
              : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-LightBlue hover:rounded-xl"
          } border-2 rounded-sm text-[18px] p-3 `}
            onClick={() => paginate(1)}
          >
            <MdKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300 "
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-LightBlue hover:rounded-xl"
            } border-2 rounded-sm text-[18px] p-3`}
            onClick={() => {
              if (currentPage !== 1) {
                paginate(currentPage - 1);
              }
            }}
          >
            <MdKeyboardArrowLeft />
          </div>

          <span className="border  px-4 py-2 rounded-full bg-LightBlue bg-opacity-50 text-gray-900">
            {currentPage}
          </span>
          <span>/ {Math.ceil(filteredProducts.length / productsPerPage)}</span>
          <div
            className={` ${
              currentPage * productsPerPage >= filteredProducts.length
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-LightBlue hover:rounded-xl "
            } rounded-sm text-[18px] p-3 border-2`}
            onClick={() => {
              if (currentPage * productsPerPage < filteredProducts.length) {
                paginate(currentPage + 1);
              }
            }}
          >
            <MdKeyboardArrowRight />
          </div>
          <div
          className={` ${
            currentPage * productsPerPage >= filteredProducts.length
              ? "cursor-not-allowed text-gray-300"
              : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-LightBlue hover:rounded-xl"
          } rounded-sm text-[18px] p-3 border-2`}
            onClick={() =>
              paginate(Math.ceil(filteredProducts.length / productsPerPage))
            }
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsFilter;
