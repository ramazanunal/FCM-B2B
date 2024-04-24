import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
function ProductsFilter() {
  return (
    <>
      <div className="flex justify-between items-center py-3">
        <div className="flex gap-4 ">
          <div className="flex gap-2">
            <select
              className="p-1 border rounded-md text-CustomGray w-64"
              name=""
              id=""
            >
              <option className="" hidden>
                Toplu Islemler
              </option>
              <option>islemler</option>
              <option>islemler</option>
            </select>

            <button className="p-1 border border-LightBlue rounded-md ">
              Uygula
            </button>
          </div>

          <div className="flex gap-2 text-sm">
            <select
              className="p-1 border rounded-md text-CustomGray w-36"
              name=""
              id=""
            >
              <option hidden>Kategori Seçin</option>
              <option>islemler</option>
              <option>islemler</option>
            </select>
            <select
              className="p-1 border rounded-md text-CustomGray w-44"
              name=""
              id=""
            >
              <option hidden>Ürün tipine göre filtreleme</option>
              <option>islemler</option>
              <option>islemler</option>
            </select>
            <select
              className="p-1 border rounded-md text-CustomGray w-52"
              name=""
              id=""
            >
              <option hidden>Stok durumuna göre filtreleme</option>
              <option>islemler</option>
              <option>islemler</option>
            </select>

            <button className="p-1 border border-LightBlue rounded-md ">
              Filtre
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-DarkBlue ">
          <p className="text-CustomGray">1.999 oge</p>
          <MdKeyboardDoubleArrowLeft className="border  rounded-sm text-[24px] p-1" />
          <MdKeyboardArrowLeft className="border  rounded-sm text-[24px] p-1" />
          <span className="border  px-4 rounded bg-white">1</span>
          <span>/90</span>
          <MdKeyboardArrowRight className="border  rounded-sm text-[24px] p-1" />
          <MdKeyboardDoubleArrowRight className="border  rounded-sm text-[24px] p-1" />
        </div>
      </div>
    </>
  );
}

export default ProductsFilter;
