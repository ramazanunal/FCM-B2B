import React, { useState, useEffect } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
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
  const [selectedProductType, setSelectedProductType] = useState("Ürüne göre filtreleme");
  const [selectedStock, setSelectedStock] = useState("Stoğa göre filtreleme");
  const [selectedAll, setSelectedAll] = useState("Toplu Islemler");
  const [selectedStatus, setSelectedStatus] = useState("Durum İşlemi");
  const [anyFilterSelected, setAnyFilterSelected] = useState(false);

  const handleClearFilters = () => {
    setSelectedCategory("Ders Seçin");
    setSelectedProductType("Ürüne göre filtreleme");
    setSelectedStock("Stoğa göre filtreleme");
    setSelectedAll("Toplu Islemler");
    setAnyFilterSelected(false);
    setFilteredProducts(products);
  };

  useEffect(() => {
    handleFilters();
  }, [selectedCategory, selectedProductType, selectedStock, selectedAll]);

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
    setAnyFilterSelected(true);
  };

  const handleStock = (e) => {
    setSelectedStock(e.target.value);
    setAnyFilterSelected(true);
  };

  const handleProductType = (e) => {
    setSelectedProductType(e.target.value);
    setAnyFilterSelected(true);
  };

  const handleAllFilter = (e) => {
    setSelectedAll(e.target.value);
    setAnyFilterSelected(true);
  };

  const handleFilters = () => {
    let filteredProducts = [...products];

    if (selectedCategory !== "Ders Seçin") {
      filteredProducts = filteredProducts.filter(
        (item) => item.category.subCategory === selectedCategory
      );
    }
    if (selectedProductType !== "Ürüne göre filtreleme") {
      filteredProducts = filteredProducts.filter(
        (item) => item.category.mainCategory === selectedProductType
      );
    }
    if (selectedStock !== "Stoğa göre filtreleme") {
      if (selectedStock === "Stokta Olanlar") {
        filteredProducts = filteredProducts.filter((item) => item.stokCount > 0);
      } else if (selectedStock === "Stokta Olmayanlar") {
        filteredProducts = filteredProducts.filter((item) => item.stokCount === 0);
      }
    }
    if (selectedAll !== "Toplu Islemler") {
      filteredProducts = filteredProducts.filter((item) => item.active.toString() === selectedAll);
    }

    setFilteredProducts(filteredProducts);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const applyStatusChange = () => {
    if (selectedStatus !== "Durum İşlemi") {
      selectedProducts.forEach((product) => (product.active = selectedStatus));
      const filteredActiveProduct = products.filter(
        (item) => item.active.toString() !== selectedStatus
      );
      setFilteredProducts(filteredActiveProduct);
      setSelectedProducts([]);
      setSelectedStatus("Durum İşlemi");
    }
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center py-3">
        <div className="flex gap-2 flex-wrap md:flex-nowrap items-center">
          <div className="flex gap-2 md:mr-8">
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-36 w-full ${
                selectedProducts.length === 0 ? "pointer-events-none opacity-50" : ""
              } ${selectedStatus !== "Durum İşlemi" ? "bg-NavyBlue text-white" : ""}`}
              onChange={handleStatusChange}
              value={selectedStatus}
            >
              <option hidden>Durum İşlemi</option>
              <option>Durum İşlemi</option>
              <option value={true}>Ürünü Aktif Yap</option>
              <option value={false}>Ürünü Pasif Yap</option>
            </select>
            <button
              className={`shadow-2xl border-NavyBlue border rounded-md text-CustomGray md:w-16 md:text-sm text-xs w-12 ${
                selectedProducts.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-NavyBlue hover:text-white"
              }`}
              onClick={applyStatusChange}
            >
              Uygula
            </button>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2 items-center text-sm">
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-48 w-full ${
                selectedAll !== "Toplu Islemler" && "bg-NavyBlue text-white font-semibold"
              }`}
              onChange={handleAllFilter}
              value={selectedAll}
            >
              <option hidden>Toplu Islemler</option>
              <option>Toplu Islemler</option>
              <option value={true}>Aktif Olan Ürünler</option>
              <option value={false}>Aktif Olmayan Ürünler</option>
            </select>
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-30 w-full ${
                selectedCategory !== "Ders Seçin" && "bg-NavyBlue text-white font-semibold"
              }`}
              onChange={handleCategory}
              value={selectedCategory}
            >
              <option hidden>Ders Seçin</option>
              <option>Ders Seçin</option>
              {subCategory.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-48 w-full ${
                selectedProductType !== "Ürüne göre filtreleme" && "bg-NavyBlue text-white font-semibold"
              }`}
              onChange={handleProductType}
              value={selectedProductType}
            >
              <option hidden>Ürüne göre filtreleme</option>
              <option>Ürüne göre filtreleme</option>
              {mainCategory.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-48 w-full ${
                selectedStock !== "Stoğa göre filtreleme" && "bg-NavyBlue text-white font-semibold"
              }`}
              onChange={handleStock}
              value={selectedStock}
            >
              <option hidden>Stoğa göre filtreleme</option>
              <option>Stoğa göre filtreleme</option>
              <option>Stokta Olanlar</option>
              <option>Stokta Olmayanlar</option>
            </select>
            <button
              className={`p-[6px] font-[500] border text-NavyBlue rounded-md text-sm whitespace-nowrap ${
                anyFilterSelected
                  ? "border-NavyBlue cursor-pointer hover:bg-NavyBlue hover:text-white"
                  : "text-NavyBlue opacity-50 border-gray-400 cursor-not-allowed"
              }`}
              onClick={handleClearFilters}
            >
              Filtre Temizle
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-DarkBlue">
          <span className="text-CustomGray md:text-base text-xs">
            {filteredProducts.length} Kitap
          </span>
          <div
            className={`${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            } border-2 rounded-sm text-[18px] md:p-3 p-1`}
            onClick={() => paginate(1)}
          >
            <MdKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            } border-2 rounded-sm text-[18px] md:p-3 p-1`}
            onClick={() => {
              if (currentPage !== 1) {
                paginate(currentPage - 1);
              }
            }}
          >
            <MdKeyboardArrowLeft />
          </div>
          <span className="border md:px-4 md:py-2 py-1 px-3 rounded-full bg-NavyBlue text-white">
            {currentPage}
          </span>
          <span>/ {Math.ceil(filteredProducts.length / productsPerPage)}</span>
          <div
            className={`${
              currentPage * productsPerPage >= filteredProducts.length
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            } rounded-sm text-[18px] md:p-3 p-1 border-2`}
            onClick={() => {
              if (currentPage * productsPerPage < filteredProducts.length) {
                paginate(currentPage + 1);
              }
            }}
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`${
              currentPage * productsPerPage >= filteredProducts.length
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            } rounded-sm text-[18px] md:p-3 p-1 border-2`}
            onClick={() => paginate(Math.ceil(filteredProducts.length / productsPerPage))}
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsFilter;
