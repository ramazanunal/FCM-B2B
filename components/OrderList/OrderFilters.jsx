import React from "react";
import OrderPagination from "./OrderPagination";

const OrderFilters = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 ">
        <div className="flex gap-2">
          <select
            className="p-1 border rounded-md text-CustomGray w-64"
            name=""
            id=""
          >
            <option className="" hidden>
              Tum Islemler
            </option>
            <option>islemler</option>
            <option>islemler</option>
          </select>

          <button className="p-1 border border-LightBlue rounded-md ">
            Uygula
          </button>
        </div>

        <div className="flex gap-2">
          <select
            className="p-1 border rounded-md  text-BaseDark w-54 font-medium"
            name=""
            id=""
          >
            <option className=" ">Tum Tarihler</option>
          </select>

          <select
            className="p-1 border rounded-md text-CustomGray w-80"
            name=""
            id=""
          >
            <option hidden>Kayitli Kullanicilara gore Filtrele</option>
            <option>islemler</option>
            <option>islemler</option>
          </select>

          <button className="p-1 border border-LightBlue rounded-md ">
            Filtre
          </button>
        </div>
      </div>
      <div>
        <OrderPagination />
      </div>
    </div>
  );
};

export default OrderFilters;
