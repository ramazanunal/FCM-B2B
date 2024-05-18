import orderInformationStore from "@/utils/orderInformationStore";
import React, { useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";

function OrderInformation() {
  const addressOptions = orderInformationStore((state) => state.address);
  const selectedAddress = orderInformationStore(
    (state) => state.address[state.selectedAddress - 1]
  );
  const [showOptions, setShowOptions] = useState(false);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("Servis");
  const [orderNote, setOrderNote] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("Adres Bilgileri");
  const handleTitleClick = (title) => {
    setSelectedTitle(title);
  };

  const handleOptionClick = (addressIndex) => {
    orderInformationStore.setState({ selectedAddress: addressIndex });
    setShowOptions(false);
  };

  const handleShippingOptionClick = (shipping) => {
    setSelectedShipping(shipping);
    setShowShippingOptions(false);
  };

  const handleOrderNoteChange = (event) => {
    setOrderNote(event.target.value);
  };

  return (
    <div>
      <div className="mx-12 sm:mx-0">
        <div className="address-selector text-CustomGray text-[14px] sm:mx-5 mt-3 flex flex-row ">
          <button
            onClick={() => handleTitleClick("Adres Bilgileri")}
            className={`input-container flex flex-col   rounded-md w-1/2 p-5  ${
              selectedTitle === "Adres Bilgileri" ? "border-2 border-sky-500" : "border border-slate-200 hover:border-LightBlue transition duration-500 ease-in-out transform"
            }`}
          >
            <div className="flex flex-row items-center justify-between">
              <p className={`text-[20px] md:text-[22px] font-bold text-CustomGray ${
              selectedTitle === "Adres Bilgileri" ? "text-LightBlue" : ""
            }`}>
                Adres Bilgileri
              </p>
            </div>
            <div>
              <div
                className="cursor-pointer  py-5  outline-none flex justify-between items-center "
                onClick={() => handleOptionClick(selectedAddress.id)}
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-row items-center  gap-3">
                    <span className="rounded-full relative">
                      {selectedAddress.icon}
                    </span>
                    <span className="font-bold text-CustomGray">
                      {selectedAddress.name}
                    </span>
                  </div>
                  <span className="italic text-[12px] w-[220px] leading-relaxed  text-start ">
                    {selectedAddress.info}
                  </span>
                </div>
              </div>
            </div>
          </button>
          {showOptions && (
            <div >
              {addressOptions.map((address, index) => (
                <div
                  key={index}
                  className={`option cursor-pointer px-5 py-5 transition duration-500 ease-in-out transform outline-none flex justify-between items-center hover:bg-slate-100 rounded-md ${
                    selectedAddress.id === address.id
                      ? "border-2 border-sky-300 "
                      : ""
                  }`}
                  onClick={() => handleOptionClick(address.id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-3">
                      <span className="p-2 border-2 border-cyan-400 rounded-full relative">
                        {address.icon}
                        <span>
                          {selectedAddress.id === address.id && (
                            <FaCheck className="absolute -top-1 right-0 text-white bg-cyan-400 rounded-full p-1" />
                          )}
                        </span>
                      </span>{" "}
                      <span
                        className={`font-bold ${
                          selectedAddress.id === address.id
                            ? "text-LightBlue"
                            : ""
                        }`}
                      >
                        {address.name}
                      </span>
                    </div>
                    <span className="italic text-[12px] w-[220px] leading-relaxed">
                      {address.info}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => handleTitleClick("Ödeme Bilgileri")}
            className={`input-container flex flex-col   rounded-md w-1/2 p-5 relative ${
              selectedTitle === "Ödeme Bilgileri" ? "border-2 border-sky-500" : "border border-slate-200 hover:border-LightBlue transition duration-500 ease-in-out transform"
            }`}
          >
            <div className="flex flex-row items-center justify-between">
              <p
                onClick={() => handleTitleClick("Ödeme Bilgileri")}
                className="text-[20px] md:text-[22px] font-bold text-CustomGray "
              >
                Ödeme Bilgileri
              </p>
            </div>
            <div>
              <p className="text-start">
                Banka/Kredi Kartı ve Alışveriş Kredisi ile ödemenizi güvenle
                yaoabilirsiniz.
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="mt-12">
        {selectedTitle === "Adres Bilgileri" && (
          <>
            <div className="options rounded-md flex flex-col border border-slate-200 h-[500px]  ">
              <h1 className="text-CustomGray font-bold text-[22px] p-5 mt-5">Teslimat Adresi</h1>
              {addressOptions.map((address, index) => (
                <div
                  key={index}
                  className={`option cursor-pointer px-5 py-5 transition duration-500 ease-in-out transform outline-none flex justify-between items-center hover:bg-slate-100 rounded-md ${
                    selectedAddress.id === address.id
                      ? "bg-slate-100 "
                      : ""
                  }`}
                  onClick={() => handleOptionClick(address.id)}
                >
                  <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row items-center gap-3 ">
                      <span className="p-2 border-2 border-cyan-400 rounded-full relative">
                        {address.icon}
                        <span>
                          {selectedAddress.id === address.id && (
                            <FaCheck className="absolute -top-1 right-0 text-white bg-cyan-400 rounded-full p-1" />
                          )}
                        </span>
                      </span>{" "}
                      <span
                        className={`font-bold ${
                          selectedAddress.id === address.id
                            ? "text-LightBlue"
                            : ""
                        }`}
                      >
                        {address.name}
                      </span>
                    </div>
                    <span className="italic text-[12px] w-[220px] leading-relaxed">
                      {address.info}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedTitle === "Ödeme Bilgileri" && (
          <>
            <div className="options rounded-md flex flex-col border border-slate-200 h-[500px]  ">
              <div>
                <h1 className="text-[20px] md:text-[22px] font-bold text-CustomGray">
                  Sipariş Notunuz
                </h1>
                <textarea
                  className="resize-none min-h-24 max-h-24 px-5 py-2 mt-3 flex border border-slate-200 rounded-md w-full md:w-[200px] text-[14px] outline-none hover:border-LightBlue transition duration-500 ease-in-out transform "
                  placeholder="Sipariş Notunuz"
                  value={orderNote}
                  onChange={handleOrderNoteChange}
                ></textarea>
              </div>
              <div>
                <h1 className="text-[20px] md:text-[32px] font-semibold text-LightBlue">
                  Kargo
                </h1>
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
                      onClick={() =>
                        setShowShippingOptions(!showShippingOptions)
                      }
                    >
                      <FaChevronDown className="hover:scale-110  transition duration-500 ease-in-out transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderInformation;
