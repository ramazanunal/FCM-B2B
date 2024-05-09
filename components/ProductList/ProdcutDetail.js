import React from "react";
import { SlBasket } from "react-icons/sl";

function ProdcutDetail({ product }) {
  return (
    <div className="flex flex-col justify-center items-center">
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
                <div className="px-3 py-[6px] bg-red-500 text-white font-bold rounded-md cursor-pointer">
                    <SlBasket/>
                </div>
         </div>
        </div>
      </div>
      <div className=" flex flex-col  w-[95%]">
        <div className="flex">
            <h2 className="  p-4 bg-gray-700 text-white font-[500] rounded">Detaylar</h2>
        </div>
          <div className="text-gray-500 mt-6 w-[80%] pl-5">
            <span >
            {product.desc}
            </span>  
          </div>
          <div className="text-gray-700 mt-6 w-[80%] pl-5 text-xl" >
            <h4>Kitabın Özellikleri</h4>
          </div>
          <div className="grid grid-cols-2">

          <div className="pl-10 mt-10 mb-10 space-y-2 font-[600]">
              <div className="border p-2">Basım Dili </div>
              <div className="border p-2">Sayfa Sayısı </div>
              <div className="border p-2">Kapak Türü </div>
              <div className="border p-2">Kağıt Türü</div>
              <div className="border p-2">Basım Yeri</div>
              <div className="border p-2">En / Boy</div>
          </div>
          <div className="mt-10 mb-10 space-y-2 text-gray-600 mr-10 ">
            <div className="border p-2">{product.bookDetail.printingLang}</div>
            <div className="border p-2">{product.bookDetail.numberOfPages}</div>
            <div className="border p-2">{product.bookDetail.coverType}</div>
            <div className="border p-2">{product.bookDetail.paperType}</div>
            <div className="border p-2">{product.bookDetail.placeOfPublication}</div>
            <div className="border p-2">{product.bookDetail.width} / {product.bookDetail.height} cm</div>
          </div>
          </div>
          
      </div>
    </div>
  );
}

export default ProdcutDetail;
