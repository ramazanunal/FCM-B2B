"use client"
import Link from "next/link";
import {React,useState} from "react";
import { FaPlus } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import ProductToggleButton from "./ProductToggleButton";

function ProdcutDetail({ product }) {
  const [purchaseAmount,setPurchaseAmount] = useState(1);
  function incrementAmount(){
    if(purchaseAmount < product.stokCount){
      setPurchaseAmount(state => state + 1)
    }
  }
  function decreaseAmount(){
    if(purchaseAmount > 1){
      setPurchaseAmount(state => state - 1)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-50 w-full">
        <div className="md:grid md:grid-cols-4 md:grid-flow-col px-5  md:px-14 pt-14 pb-3 mb-2 md:mx-auto md:w-[80%]">
          <div className="col-span-2  flex justify-center items-center">
            <div className="max-w-xl">
              <img className="" src={product.imgPath} alt={product.name} />
            </div>
          </div>
          <div className="col-span-2 ml-5">
            <div className="font-bold text-3xl md:mt-0 mt-6 pb-3 ">
              {product.name}
            </div>
            <div className="flex space-x-2 mt-5">
              <div className="space-y-5 text-gray-500 ">
                <div>Yazar:</div>
                <div>Yayınevi:</div>
                <div>Kategori:</div>
                <div>Barkod:</div>
                <div>Fiyat:</div>
                <div>Stok:</div>
              </div>
              <div className="space-y-5">
                <div className="text-LightBlue">{product.writer}</div>
                <div className="text-LightBlue">{product.publisher}</div>
                <div className="text-LightBlue">
                  {product.category.subCategory}
                </div>
                <div className="text-gray-600">{product.barkod}</div>
                <div className="text-2xl">₺{product.price}</div>
                <div className="text-green-500 text-lg">{product.stokCount}</div>
              </div>
            </div>
            <div className="flex flex-row items-center mt-5 mb-5 ">
              <div className="border bg-white rounded flex justify-around w-20">
                <button onClick={decreaseAmount} className="w-full opacity-50  px-1 py-1">-</button>
                <span className="w-full text-center self-center">{purchaseAmount}</span>
                <button onClick={incrementAmount} className="w-full opacity-50  px-1 py-1">+</button>
              </div>
              <button className="px-3 py-2 ml-2 rounded text-center bg-CustomRed text-white text-md">Sepete Ekle</button>

             
            </div>
            <div>
              <ProductToggleButton />
            </div>
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
              <IoArrowBackCircleSharp className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdcutDetail;
