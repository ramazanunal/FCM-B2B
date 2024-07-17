import Link from "next/link";
import React from "react";
import {  FaPlus } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import ProductToggleButton from "./ProductToggleButton";

function ProdcutDetail({ product }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:grid md:grid-cols-3  px-14 pt-14 bg-gray-50 w-full pb-3 mb-2">
        <div className="col-span-1 border flex justify-center items-center">
          <img src={product.imgPath} alt={product.name} />
        </div>
        <div className="col-span-2 ml-5">
          <div className="font-bold text-3xl border-b md:mt-0 mt-6 pb-10 ">
            {product.name}
          </div>
          <div className="flex space-x-2 mt-8">
            <div className="space-y-3 text-gray-500 ">
              <div>Yazar:</div>
              <div>Yayınevi:</div>
              <div>Kategori:</div>
              <div>Barkod:</div>
              <div>Fiyat:</div>
              <div>Stok:</div>
            </div>
            <div className="space-y-3">
              <div className="text-LightBlue">{product.writer}</div>
              <div className="text-LightBlue">{product.publisher}</div>
              <div className="text-LightBlue">
                {product.category.subCategory}
              </div>
              <div className="text-gray-600">{product.barkod}</div>
              <div className="text-lg">₺{product.price}</div>
              <div className="text-green-500 text-lg">{product.stokCount}</div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5 mb-5 ">
            <input
              type="number"
              min="1"
              name="quantity"
              className="text-center pr-2 sm:pr-0 w-14 md:w-16 h-8 border-2 border-LightBlue hover:border-CustomGray  hover:text-CustomGray transition duration-300 ease-in-out transform outline-none rounded-md  text-LightBlue "
            />

            <button
              type="submit"
              className="flex flex-row items-center justify-center gap-2 ml-3 text-white font-bold hover:scale-105 transition-all transform ease-in-out duration-500 cursor-pointer bg-LightBlue/75 pl-3 pr-11 py-2 rounded-full relative w-[160px] h-[40px]"
            >
              Sepete Ekle
              <span
                className={`absolute -top-1 -right-2 text-white bg-gradient-to-r from-sky-600 to-cyan-700 p-3 border-4 border-white rounded-full transition-all duration-500 ease-out transform`}
              >
                <FaPlus />
              </span>
            </button>
          </div>
          <div>
            <ProductToggleButton />
          </div>
        </div>
      </div>
      <div className="flex  w-full p-5 ">
      <h2 className="  p-4 bg-NavyBlue text-white font-[500] rounded">
        Detaylar
      </h2>
    </div>
      <div className=" flex flex-col justify-center     w-[95%] ">
       
        <div className="text-gray-500   md:w-[80%] rounded-lg shadow-lg shadow-LightBlue/15 mb-6  p-5">
          <span>{product.desc}</span>
        </div>
        <div className="text-gray-700 mt-6  pl-5 text-xl flex">
          <h4 className="border-b-2 border-LightBlue pb-1   ">
            Kitabın Özellikleri
          </h4>
        </div>
        <div className="grid grid-cols-2 text-xs md:text-base">
          <div className="pl-10 mt-10 mb-10 space-y-2 font-[600]">
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
              <div className="border border-l-4 border-l-LightBlue p-2 shadow-md" >
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
          <div className="mt-10  mb-10 space-y-2 text-gray-600 mr-10 ">
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
        <div className="w-full flex justify-end py-5 px-10">
          <div className="p-2 bg-red-400 hover:bg-red-500 rounded-lg text-white ">
            <Link href="/products">
              <IoArrowBackCircleSharp className="text-2xl"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdcutDetail;
