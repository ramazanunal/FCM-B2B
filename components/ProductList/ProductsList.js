"use client"
import React,{ useState } from 'react';
import { products, status } from './data';
import ProductsFilter from './ProductsFilter';
import ProdcutsTable from './ProdcutsTable';

function ProductList() {

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const filterStatus = (status) => {
    setSelectedStatus(status);
    if (status === "Tümü") {
      setFilteredProducts(products);
    } else {
      const filterProducts = products.filter((item) => item.published === true);
      setFilteredProducts(filterProducts);
    }
  }
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
    <ProductsFilter/>
    <ProdcutsTable filteredProducts={filteredProducts}/>
  </>
  )
}

export default ProductList