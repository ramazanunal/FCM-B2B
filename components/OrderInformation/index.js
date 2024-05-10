import orderInformationStore from "@/utils/orderInformationStore";
import React, { useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

function OrderInformation() {
  const addressOptions = orderInformationStore((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState("Sevk Adresi Arayın");
  const [selectedShipping, setSelectedShipping] = useState("Servis"); 
  const [showOptions, setShowOptions] = useState(false);
  const [showShippingOptions, setShowShippingOptions] = useState(false);

  //adres için fonksiyon
  const handleOptionClick = (address) => {
    setSelectedAddress(address);
    setShowOptions(false);
  };

  // kargo için fonksiyon
  const handleShippingOptionClick = (shipping) => {
    setSelectedShipping(shipping);
    setShowShippingOptions(false);
  };

  return (
    <div>
      <div className="bg-amber-100 my-10 px-10 sm:px-16 py-10 rounded-md mx-12 sm:mx-0 text-[14px] sm:text-[16px]">
        <p className="text-blue-900 font-bold  ">
          Sevk Adresi seçilmediğinde, kayıtlı olan adresiniz kullanılacaktır.
        </p>
      </div>
      <div className="mx-12 sm:mx-0">
        <h1 className="text-[20px] md:text-[32px] font-semibold">Sevk Adresleri</h1>
        <div className="address-selector relative text-CustomGray text-[14px] sm:mx-5 mt-3 flex">
          <div className="input-container flex flex-row items-center justify-between  border border-slate-200  rounded-md w-full">
            <input
              type="text"
              className="px-5 py-2 "
              value={selectedAddress}
              readOnly
            />
            <span
              className="border-l border-slate-200 px-5 py-2 hover:bg-gray-50  transition duration-500 ease-in-out transform"
              onClick={() => setShowOptions(!showOptions)}
            >
              <FaChevronDown className="hover:scale-105 transition duration-500 ease-in-out transform" />
            </span>
          </div>
          {showOptions && (
            <div className="options absolute top-9 rounded-md flex flex-col border border-slate-200  w-full z-20 bg-white shadow-lg">
              {addressOptions.map((address, index) => (
                <div
                  key={index}
                  className={`option cursor-pointer px-5 py-2 transition duration-500 ease-in-out transform outline-none flex justify-between items-center ${
                    selectedAddress === address.info ? "bg-red-50" : ""
                  }`}
                  onClick={() => handleOptionClick(address.info)}
                >
                  <div className="flex flex-col gap-2  ">
                    <span className="font-bold ">{address.name}</span>
                    <span className="italic text-[12px] ">{address.info}</span>
                  </div>
                  {selectedAddress === address.info && (
                    <FaCheck className="text-BasketRed" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-10 mt-[40px] mx-12 sm:mx-0">
        <div>
          <h1 className="text-[20px] md:text-[32px] font-semibold">Sipariş Notunuz</h1>
          <textarea
            className="resize-none min-h-12 max-h-14 px-5 py-2 mt-3 flex border border-slate-200 rounded-md w-full md:w-[450px] text-[14px] outline-none"
            placeholder="Sipariş Notunuz"
          ></textarea>
        </div>
        <div>
          <h1 className="text-[20px] md:text-[32px] font-semibold text-BasketRed">Kargo</h1>
          <div className="address-selector relative text-CustomGray text-[14px] mt-3 flex">
            <div className="input-container flex flex-row items-center justify-between  border border-slate-200  rounded-md w-[200px]">
              <input
                type="text"
                className="px-5 py-2 w-[150px]"
                value={selectedShipping}
                readOnly
              />
              <span
                className="px-5 py-2 "
                onClick={() => setShowShippingOptions(!showShippingOptions)}
              >
                <FaChevronDown className="hover:scale-110  transition duration-500 ease-in-out transform" />
              </span>
            </div>
            {showShippingOptions && (
              <div className="options absolute top-9 rounded-md flex flex-col border border-slate-200  w-[200px] z-20 bg-white shadow-lg">
                {[
                  "Servis",
                  "Kapıda Ödeme",
                  "Standart Kargo",
                  "Express Kargo",
                ].map((shipping, index) => (
                  <div
                    key={index}
                    className={`option cursor-pointer px-5 py-2 transition duration-500 ease-in-out transform outline-none flex justify-between items-center ${
                      selectedShipping === shipping ? "bg-red-50" : ""
                    }`}
                    onClick={() => handleShippingOptionClick(shipping)}
                  >
                    <div className="flex flex-col gap-2  ">
                      <span>{shipping}</span>
                    </div>
                    {selectedShipping === shipping && (
                      <FaCheck className="text-BasketRed" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInformation;
