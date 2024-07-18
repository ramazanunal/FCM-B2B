"use client";
import { useState } from "react";

// kullanılacak amaç için modifiye edilmelidir
// items prop olarak ta verilebilir/gelebilir?
export default function ProductToggleButton({ product }) {
  const [items, setItems] = useState(["Ürün açıklaması", "Ürün özellikleri"]);
  const [currentValue, setCurrentValue] = useState(0);

  function DisplayProductDetail (){
    return (
      <div className="text-gray-500 border w-full max-h-60 overflow-auto rounded-lg shadow-lg p-5">
        <span>{product.desc}</span>
      </div>
    );
  };

  function DisplayProductProps (){
    return (
      <div className="grid grid-cols-2 md:p-5 border rounded-lg text-xs md:text-base">
        <div className=" space-y-2 font-[600]">
          {product?.bookDetail?.printingLang && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              Basım Dili
            </div>
          )}
          {product?.bookDetail?.numberOfPages && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              Sayfa Sayısı
            </div>
          )}
          {product?.bookDetail?.coverType && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              Kapak Türü
            </div>
          )}
          {product?.bookDetail?.paperType && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md ">
              Kağıt Türü
            </div>
          )}
          {product?.bookDetail?.placeOfPublication && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              Basım Yeri
            </div>
          )}
          {product?.bookDetail?.width && product?.bookDetail?.height && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              En / Boy
            </div>
          )}
        </div>
        <div className=" space-y-2 text-gray-600 ">
          {product?.bookDetail?.printingLang && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              {product.bookDetail.printingLang}
            </div>
          )}
          {product?.bookDetail?.numberOfPages && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              {product.bookDetail.numberOfPages}
            </div>
          )}
          {product?.bookDetail?.coverType && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              {product.bookDetail.coverType}
            </div>
          )}
          {product?.bookDetail?.paperType && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              {product.bookDetail.paperType}
            </div>
          )}
          {product?.bookDetail?.placeOfPublication && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              {product.bookDetail.placeOfPublication}
            </div>
          )}

          {product?.bookDetail?.width && product?.bookDetail?.height && (
            <div className="border border-l-4 border-l-LightBlue p-2 shadow-md">
              {product.bookDetail.width} / {product.bookDetail.height} cm
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-10">
      <div
        className={`relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-[2px] after:block after:transition-transform after:ease-in-out after:bg-gradient-to-r after:from-sky-600 after:to-cyan-700 ${
          currentValue === 0 ? "after:translate-x-0" : "after:translate-x-full"
        }`}
      >
        <div className="flex">
          {items.map((e, i) => (
            <button
              className="w-full mb-1"
              key={i}
              onClick={() => setCurrentValue(i)}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-1 md:p-2 border shadow-LightBlue/15">
        {currentValue === 0 ? <DisplayProductDetail /> : <DisplayProductProps />}
      </div>
    </div>
  );
}
