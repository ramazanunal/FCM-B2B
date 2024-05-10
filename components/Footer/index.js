"use client";
import footerStore from "@/utils/footerStore";
import Image from "next/image";
import React from "react";

function Footer() {
  const { text, footerLogo } = footerStore();

  return (
    <footer id="footer" className="bottom-0 bg-white mt-[40px] mb-[50px]">
      <div className="border-t border-slate-100 pt-[30px] mx-[50px] w-screen lg:w-[1088px]">
        <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-between px-[50px] xl:px-0">
          <div className="order-2 sm:order-1 text-FooterText text-[14px] py-[3px] mb-[20px] sm:mb-0 mt-[20px] sm:mt-0">
            {text[0].name}
          </div>
          <div className="order-1 sm:order-2 rounded-full bg-CustomGray w-[90px] h-[90px] flex items-center justify-center hover:bg-LightBlue transition duration-500 ease-in-out transform px-[15px]">
            <Image
              src={footerLogo[0].logosrc}
              width={70}
              height={70}
              alt="Çalışkan Arı Mağaza"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
