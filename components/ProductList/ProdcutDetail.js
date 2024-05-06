import React from "react";
import { SlBasket } from "react-icons/sl";

function ProdcutDetail({ product }) {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3  px-14 pt-14 bg-gray-50 w-full">
        <div className="col-span-1 ">
          <img src={product.imgPath} alt={product.name} />
        </div>
        <div className="col-span-2">
          <div className="font-bold text-3xl border-b pb-10 ">
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
                <div className="text-LightBlue">{product.category.subCategory}</div>
                <div className="text-gray-600">{product.barkod}</div>
                <div className="text-lg">₺{product.price}</div>
                <div className="text-green-500 text-lg">{product.stokCount}</div>
            </div>
         </div>
         <div className="flex space-x-3 items-center ml-20 mt-8 mb-10">
                <input type="number" className="bg-gray-200 border-2 border-gray-400 w-10 rounded" />
                <div className="px-3 py-[6px] bg-red-500 text-white font-bold rounded-md">
                    <SlBasket/>
                </div>
         </div>
        </div>
      </div>
    </div>
  );
}

export default ProdcutDetail;
