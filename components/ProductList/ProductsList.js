"use client";
import React, { useState, useEffect } from "react";
import { products, status, category } from "./data";
import ProductsFilter from "./ProductsFilter";
import ProdcutsTable from "./ProdcutsTable";

function ProductList() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([]);



  const filterStatus = (status) => {
    setSelectedStatus(status);
    if (status === "Tümü") {
      setFilteredProducts(products);
    } else if (status === "Yayımlanmış") {
      const filterProducts = products.filter((item) => item.published === true);
      setFilteredProducts(filterProducts);
    }

   

    //filtreleme yapılırsa ilk sayfaya dön
    setCurrentPage(1);
  };

  //Arama inputu işlemleri
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.stok.toLowerCase().includes(term.toLowerCase()) ||
        product.category.mainCategory
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        product.category.subCategory
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        product.date.productAdditionDate
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        product.date.lastUpdateDate
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        product.price.toString().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
  };
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
      <div className=" justify-between flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0  ">
        <div className="flex gap-2">
          {status.map((status, index) => (
            <React.Fragment key={index}>
              <span
                onClick={() => filterStatus(status.name)}
                className={
                  selectedStatus === status.name
                    ? "text-BaseDark font-medium cursor-pointer"
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
        <div className="flex ">
          <form action="" className="flex gap-2 ">
            <input
              type="text"
              className="p-2 border rounded-md "
              placeholder="Search.."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="p-2 border text-xs md:text-base  border-LightBlue rounded-md text-black"
              type="submit"
            >
              Ürün Ara
            </button>
          </form>
        </div>
      </div>
      <ProductsFilter
        filterStatus={filterStatus}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        paginate={paginate}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <ProdcutsTable
        currentProducts={currentProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
       
        
      />
    </>
  );
}

export default ProductList;
