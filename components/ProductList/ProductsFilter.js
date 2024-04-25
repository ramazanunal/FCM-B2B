
import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { mainCategory, subCategory,products } from "./data";
function ProductsFilter({
  filteredProducts,
  paginate,
  currentPage,
  productsPerPage,
  filterStatus,
  setFilteredProducts
}) {
  const handleCategory = (e) => {
    const selectCategory = e.target.value;
    if (selectCategory === "Kategori Seçin") {
      setFilteredProducts(products);
    } else {
      const filteredByCategory = products.filter((item) => item.category.subCategory === selectCategory);
      setFilteredProducts(filteredByCategory);
    }
  
  };

  const handleStock = (e) => {
    const selectStock = e.target.value;
    filterStatus(selectStock);
  };


  // ürün tipine göre filtreleme işlemi ve ürün tipi seçme
  const handleProductType = (e) => {
    const selectProductType = e.target.value;
    if (selectProductType === "Ürün tipine göre filtreleme") {
      setFilteredProducts(products);
    } else {
      const filteredByProductType = products.filter((item) => item.category.mainCategory === selectProductType);
      setFilteredProducts(filteredByProductType);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center py-3">
        <div className="flex gap-4 ">
          <div className="flex gap-2">
            <select
              className="p-1 border rounded-md text-CustomGray w-64"
              name=""
              id=""
            >
              <option className="" hidden>
                Toplu Islemler
              </option>
              <option>islemler</option>
              <option>islemler</option>
            </select>

            <button className="p-1 border border-LightBlue rounded-md ">
              Uygula
            </button>
          </div>

          <div className="flex gap-2 text-sm">
            <select
              className="p-1 border rounded-md text-CustomGray w-36"
              name=""
              id=""
              onChange={handleCategory}
            >
              <option>Kategori Seçin</option>

              <option hidden>Kategori Seçin</option>
              {subCategory.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
              className="p-1 border rounded-md text-CustomGray w-44"
              name=""
              id=""
              onChange={handleProductType}
            >
              <option hidden>Ürün tipine göre filtreleme</option>
              <option >Ürün tipine göre filtreleme</option>
              {mainCategory.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
              className="p-1 border rounded-md text-CustomGray w-52"
              name=""
              id=""
              onChange={handleStock}
            >
              <option hidden>Stok durumuna göre filtreleme</option>
              <option>Stok durumuna göre filtreleme</option>
              <option>Stokta Olanlar</option>
              <option>Stokta Olmayanlar</option>
            </select>

            <button className="p-1 border border-LightBlue rounded-md ">
              Filtre
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-DarkBlue ">
          <span className="text-CustomGray">
            {filteredProducts.length} kitap
          </span>
          <MdKeyboardDoubleArrowLeft
            className="border  rounded-sm text-[24px] p-1"
            onClick={() => paginate(1)}
          />
          <MdKeyboardArrowLeft
            className={`border  rounded-sm text-[24px] p-1 ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300 "
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (currentPage !== 1) {
                paginate(currentPage - 1);
              }
            }}
          />
          <span className="border  px-4 rounded bg-white">{currentPage}</span>
          <span>/ {Math.ceil(filteredProducts.length / productsPerPage)}</span>
          <MdKeyboardArrowRight
            className={`border rounded-sm text-[24px] p-1 ${
              currentPage * productsPerPage >= filteredProducts.length
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer text-gray-900"
            }`}
            onClick={() => {
              if (currentPage * productsPerPage < filteredProducts.length) {
                paginate(currentPage + 1);
              }
            }}
          />
          <MdKeyboardDoubleArrowRight
            className="border  rounded-sm text-[24px] p-1"
            onClick={() =>
              paginate(Math.ceil(filteredProducts.length / productsPerPage))
            }
          />
        </div>
      </div>
    </>
  );
}

export default ProductsFilter;
