"use client";
import React, { useState } from "react";
import { products, status, category } from "./data";
import ProductsFilter from "./ProductsFilter";
import ProdcutsTable from "./ProdcutsTable";

function ProductList() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filterStatus = (status) => {
    setSelectedStatus(status);
    if (status === "Tümü" || status === "Kategori Seçin") {
      setFilteredProducts(products);
    }else if (status === "Yayımlanmış") {
      const filterProducts = products.filter((item) => item.published === true);
      setFilteredProducts(filterProducts);
    }else{
      let filteredByCategory = products.filter((item) => item.category.mainCategory === status)
      setFilteredProducts(filteredByCategory)
      
    }
    
    console.log(status);
    //filtreleme yapılırsa ilk sayfaya dön
    setCurrentPage(1)
  }
  // sayfa değiştirme işlevi
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //sayfada gösterilcek ürün sayısı
  const indexOfLastProduct = currentPage * productsPerPage;
  //gösterilen üründen gösterilcek ürünü çıkarıp kaç ürün kalcağını belirleme
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //başlangıç ve son sayfa indexi belirleme
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className=" justify-between flex  ">
        <div className="flex gap-2">
          {status.map((status, index) => (
            <React.Fragment key={index}>
              <span
                onClick={() => filterStatus(status.name)}
                className={
                  selectedStatus === status.name
                    ? "text-BaseDark cursor-pointer"
                    : "cursor-pointer"
                }
              >
                {status.name}
              </span>
              <span className="text-CustomGray">({status.count})</span>
              {index !== status.length - 1 && (
                <span className="text-CustomGray">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex">
          <form action="" className="flex gap-2">
            <input type="text" className="p-2 border rounded-md" />
            <button
              className="p-2 border border-LightBlue rounded-md"
              type="submit"
            >
              Siparişleri Ara
            </button>
          </form>
        </div>
      </div>
      <ProductsFilter
        filterStatus={filterStatus}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        filteredProducts={filteredProducts}
        paginate={paginate}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
      />
      <ProdcutsTable currentProducts={currentProducts} />
    </>
  );
}

export default ProductList;
