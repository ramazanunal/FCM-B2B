
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
  setFilteredProducts,
  selectedProducts,
  setSelectedProducts
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

  //toplu işlemlere göre filtreleme
  const handleAllFilter = (e) => {
    const selectIsActive = e.target.value;
    if (selectIsActive === "Toplu Islemler") {
      setFilteredProducts(products)
    }else{
      const filteredActiveProduct = products.filter((item)=> item.active.toString() === selectIsActive)
      setFilteredProducts(filteredActiveProduct)
    }
  }

  //aktif pasif yapma
  const handleIsActive = (e) => {
    const selectProduct = e.target.value;
    if (selectProduct === "Durum İşlemi") {
      setFilteredProducts(products)
    }else{
      
     selectedProducts.map((product) => product.active = selectProduct)
     const filteredActiveProduct = products.filter((item)=> item.active.toString() !== selectProduct)
     
     console.log(selectedProducts, "SELECT");
     setFilteredProducts(filteredActiveProduct)
     setSelectedProducts([])

     
    }
  }
  return (
    <>
      <div className="flex justify-between items-center py-3">
        <div className="flex gap-4 ">
          <div className="flex gap-2">
            <select
              className="p-1 border rounded-md text-CustomGray w-64"
              name=""
              id=""
              onChange={handleAllFilter}
            >
              <option className="" hidden>
                Toplu Islemler
              </option>
              <option className="" >
                Toplu Islemler
              </option>
              <option value={true}>Aktif Olan Ürünler</option>
              <option value={false}>Aktif Olmayan Ürünler</option>
            </select>
            <select
              className="p-1 border rounded-md text-CustomGray w-64"
              name=""
              id=""
              onChange={handleIsActive}
            >
              <option className="" hidden>
                Durum İşlemi
              </option>
              <option className="" >
                Durum İşlemi
              </option>
              <option value={true}>Ürünü Aktif Yap</option>
              <option value={false}>Ürünü Pasif Yap</option>
            </select>

           
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
            {filteredProducts.length} Kitap
          </span>
          <div className="border  rounded-sm text-[18px] p-3">
          <MdKeyboardDoubleArrowLeft
           
            onClick={() => paginate(1)}
          />
          </div>
          <div className="border  rounded-sm text-[18px] p-3">
           <MdKeyboardArrowLeft
            className={`${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300 "
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (currentPage !== 1) {
                paginate(currentPage - 1);
              }
            }}
          /></div>
         
          <span className="border  px-8 py-2 rounded bg-white">{currentPage}</span>
          <span>/ {Math.ceil(filteredProducts.length / productsPerPage)}</span>
          <div className="border  rounded-sm text-[18px] p-3">
          <MdKeyboardArrowRight
            className={` ${
              currentPage * productsPerPage >= filteredProducts.length
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer text-gray-900"
            }`}
            onClick={() => {
              if (currentPage * productsPerPage < filteredProducts.length) {
                paginate(currentPage + 1);
              }
            }}
          /></div>
          <div className="border  rounded-sm text-[18px] p-3"> 
           <MdKeyboardDoubleArrowRight
            
            onClick={() =>
              paginate(Math.ceil(filteredProducts.length / productsPerPage))
            }
          /></div>
        
        </div>
      </div>
    </>
  );
}

export default ProductsFilter;
