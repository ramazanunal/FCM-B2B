import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const OrderPagination = () => {
  return (
    <div className="flex items-center gap-2 text-DarkBlue ">
      <p className="text-CustomGray">1.999 oge</p>
      <MdKeyboardDoubleArrowLeft className="border  rounded-sm text-[24px] p-1" />
      <MdKeyboardArrowLeft className="border  rounded-sm text-[24px] p-1" />
      <span className="border  px-4 rounded bg-white">1</span>
      <span>/90</span>
      <MdKeyboardArrowRight className="border  rounded-sm text-[24px] p-1" />
      <MdKeyboardDoubleArrowRight className="border  rounded-sm text-[24px] p-1" />
    </div>
  );
};

export default OrderPagination;
