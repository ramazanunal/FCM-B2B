"use client";
import React, { useState, useEffect } from "react";
import { status, category } from "./data";
import ProductsFilter from "./ProductsFilter";
import ProductsTable from "./ProdcutsTable";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true); 


console.log(selectedProducts,"SELECT PRODUCTS");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) {
          throw new Error('API hatası: ' + response.status);
        }
        const data = await response.json();
        setProducts(data.data);
        setFilteredProducts(data.data); // Initialize filteredProducts
        setLoading(false)
      } catch (error) {
        console.error('Veri çekme hatası: ', error);
      }
    };
    fetchData();
  }, []);
  console.log(products);

  const filterStatus = (status) => {
    setSelectedStatus(status);
    if (status === "Tümü") {
      setFilteredProducts(products);
    } else if (status === "Yayımlanmış") {
      const filterProducts = products.filter((item) => item.published === true);
      setFilteredProducts(filterProducts);
    }
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.STKCINSI?.toLowerCase().includes(term.toLowerCase()) ||
        product.STKKOD?.toLowerCase().includes(term.toLowerCase()) ||
        product.STOK?.toLowerCase().includes(term.toLowerCase()) ||
        product.FIYAT?.toLowerCase().includes(term.toLowerCase()) ||
        product.STKOZKOD3?.toLowerCase().includes(term.toLowerCase()) ||
        product.CARGRADE?.toString().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // aşağıdaki ahtayı düzelt
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <>
      <div className="justify-between flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0">
        <div className="flex gap-2">
          {status.map((status, index) => (
            <React.Fragment key={index}>
              <span
                onClick={() => filterStatus(status.name)}
                className={selectedStatus === status.name ? "text-BaseDark font-medium cursor-pointer" : "cursor-pointer"}
              >
                {status.name}
              </span>
              <span className="text-CustomGray">({status.count})</span>
              {index !== status.length - 1 && <span className="text-CustomGray">|</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="text-3xl">Ürünler</div>
        <div className="flex w-72">
          <form action="" className="flex gap-2">
            <input
              type="text"
              className="p-2 border rounded-md w-72"
              placeholder="Ürün Ara..."
              value={searchTerm}
              onChange={handleSearch}
            />
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
        products={products}
      />
      <ProductsTable
        currentProducts={currentProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        loading={loading}
      />
    </>
  );
}

export default ProductList;
