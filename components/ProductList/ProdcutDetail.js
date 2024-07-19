"use client";
import Link from "next/link";
import { React, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import ProductToggleButton from "./ProductToggleButton";

function ProdcutDetail({ product }) {
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  function incrementAmount() {
    if (purchaseAmount < product.stokCount) {
      setPurchaseAmount((state) => state + 1);
    }
  }
  function decreaseAmount() {
    if (purchaseAmount > 1) {
      setPurchaseAmount((state) => state - 1);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-50 w-full">
        <div className="grid grid-rows-2 px-5 lg:w-[1188px]  md:px-14 pt-14 pb-3 mb-2  lg:mx-auto">
          <div className="row-span-1 md:grid md:grid-cols-4 md:grid-flow-col ">
            <div className="col-span-2 flex md:justify-end ">
              <div className=" max-w-xl">
                <img
                  className="max-h-96"
                  src={product.imgPath}
                  alt={product.name}
                />
              </div>
            </div>
            <div className=" flex flex-col justify-center col-span-2 md:ml-5  pt-5">
              <div className="font-bold text-3xl md:mt-0 mt-6 pb-3 px-3">
                {product.name}
              </div>
              <div className="flex space-x-2 mt-5 px-3">
                <div className="space-y-4 text-gray-500 ">
                  <div>Yazar:</div>
                  <div>Yayınevi:</div>
                  <div>Kategori:</div>
                  <div>Barkod:</div>
                  <div>Stok:</div>
                  <div>Fiyat:</div>
                </div>
                <div className="space-y-4">
                  <div className="text-LightBlue">{product.writer}</div>
                  <div className="text-LightBlue">{product.publisher}</div>
                  <div className="text-LightBlue">
                    {product.category.subCategory}
                  </div>
                  <div className="text-gray-600">{product.barkod}</div>

                  <div className="text-green-500 ">{product.stokCount}</div>
                  <div className="text-2xl">₺{product.price}</div>
                </div>
              </div>
              <div className="flex flex-row items-center mt-5 mb-5 px-3">
                <div className="border border-LightBlue hover:border-CustomGray bg-white rounded flex justify-around w-20 text-LightBlue    hover:text-CustomGray transition duration-300 ease-in-out transform">
                  <button
                    onClick={decreaseAmount}
                    className="w-full opacity-50  px-1 py-1"
                  >
                    -
                  </button>
                  <span className="w-full text-center self-center">
                    {purchaseAmount}
                  </span>
                  <button
                    onClick={incrementAmount}
                    className="w-full opacity-50  px-1 py-1"
                  >
                    +
                  </button>
                </div>
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center gap-2 ml-10 sm:ml-4 lg:ml-2 text-white font-bold hover:scale-105 transition-all transform easy-in-out duration-500 cursor-pointer bg-LightBlue/75 pl-2 pr-9 py-2 rounded-full relative w-[130px] sm:w-[160px] h-[40px] text-[13px] sm:text-[15px]"
                >
                  Sepete Ekle
                  <span
                    className={`absolute -top-1 -right-2 text-white bg-gradient-to-r from-sky-600 to-cyan-700 p-3 border-4 border-white rounded-full transition-all duration-500 ease-out transform`}
                  >
                    <FaPlus />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className=" row-span-1">
            <ProductToggleButton product={product} />
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center     w-[95%] ">
        <div className="w-full flex justify-end py-5 px-10">
          <div className="p-2 bg-red-400 hover:bg-red-500 rounded-lg text-white ">
            <Link href="/products">
              <IoArrowBackCircleSharp className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdcutDetail;
