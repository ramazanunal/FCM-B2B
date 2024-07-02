import React, { useState, useEffect } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

function ProductsFilter({
  filteredProducts,
  setProducts,
  setCurrentPage,
  setLoading,
  paginate,
  currentPage,
  productsPerPage,
  setFilteredProducts,
  products,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Kategori Seçin");
  const [selectedProductType, setSelectedProductType] = useState(
    "Sınıfa göre filtreleme"
  );

  const [anyFilterSelected, setAnyFilterSelected] = useState(false);
  const [STKOZKOD2Array, setSTKOZKOD2Array] = useState([]);
  const [STKOZKOD3Array, setSTKOZKOD3Array] = useState([]);

  useEffect(() => {
    handleFilters();
  }, [selectedCategory, selectedProductType]);

// STKOZKOD2'leri toplama ve filtreleme fonksiyonu
useEffect(() => {
  const STKOZKOD2s = filteredProducts
    .map((product) => product.STKOZKOD2)
    .filter((item) => item && item.trim() !== ""); // Boşlukları filtrele

  const uniqueSTKOZKOD2s = [...new Set(STKOZKOD2s)];
  setSTKOZKOD2Array(uniqueSTKOZKOD2s);
}, [filteredProducts]);


  // STKOZKOD3'leri toplama ve filtreleme fonksiyonu
useEffect(() => {
  const STKOZKOD3s = filteredProducts
    .map((product) => product.STKOZKOD3)
    .filter(Boolean)
    .filter((item) => item !== "ANASINIFI" && item !== "SÖZLÜK"); // İstenmeyen öğeleri filtrele

  const uniqueSTKOZKOD3s = [...new Set(STKOZKOD3s)];
  setSTKOZKOD3Array(uniqueSTKOZKOD3s);
}, [filteredProducts]);

const handleClearFilters = async () => {
  setSelectedCategory("Kategori Seçin");
  setSelectedProductType("Sınıfa göre filtreleme");
  setAnyFilterSelected(false);

  setLoading(true); // Loading state'ini true yaparak yükleniyor ekranı gösterebiliriz.

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!response.ok) {
      throw new Error("API hatası: " + response.status);
    }
    const data = await response.json();
    const allProducts = data.data;
    const filteredProducts = allProducts.filter(
      (product) => product.STKOZKOD1 === "A"
    );
    setProducts(allProducts);
    setFilteredProducts(filteredProducts); // Tüm ürünleri ve filtrelenecek ürünleri güncelle
    setCurrentPage(1); // Sayfalamayı sıfırla
    setLoading(false); // Loading state'ini false yaparak yükleniyor ekranını kapat
  } catch (error) {
    console.error("Veri çekme hatası: ", error);
    setLoading(false); // Hata durumunda da loading state'ini kapat
  }
};
  useEffect(() => {
    handleFilters();
  }, [selectedCategory, selectedProductType]);

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
    setAnyFilterSelected(true);
  };

  const handleProductType = (e) => {
    setSelectedProductType(e.target.value);
    setAnyFilterSelected(true);
  };

  const handleFilters = () => {
    let filteredProducts = [...products];

    if (selectedCategory !== "Kategori Seçin") {
      filteredProducts = filteredProducts.filter(
        (item) => item.STKOZKOD2 === selectedCategory
      );
      console.log(selectedCategory);
    }

    if (selectedProductType !== "Sınıfa göre filtreleme") {
      filteredProducts = filteredProducts.filter(
        (item) => item.STKOZKOD3 === selectedProductType
      );
    }

    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center py-3">
        <div className="flex gap-2 flex-wrap md:flex-nowrap items-center">
          <div className="flex flex-wrap md:flex-nowrap gap-2 items-center text-sm">
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-30 w-full ${
                selectedCategory !== "Kategori Seçin" &&
                "bg-NavyBlue text-white font-semibold"
              }`}
              onChange={handleCategory}
              value={selectedCategory}
            >
              <option hidden>Kategori Seçin</option>
              <option>Kategori Seçin</option>
              {STKOZKOD2Array.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
              className={`p-2 cursor-pointer shadow-2xl border rounded-md text-CustomGray md:w-48 w-full ${
                selectedProductType !== "Sınıfa göre filtreleme" &&
                "bg-NavyBlue text-white font-semibold"
              }`}
              onChange={handleProductType}
              value={selectedProductType}
            >
              <option hidden>Sınıfa göre filtreleme</option>
              <option>Sınıfa göre filtreleme</option>
              {STKOZKOD3Array.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
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
