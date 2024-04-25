"use client";
import footerStore from "@/utils/footerStore";
import Image from "next/image";
import React from "react";

function Footer() {
  const { text, footerLogo } = footerStore();

  return (
    <footer
      id="footer"
      className="bottom-0 bg-white mt-[40px] mb-[50px] w-[1188px] "
    >
      <div className="border-t border-slate-100 pt-[30px] mx-[50px]">
      <div className="flex flex-row justify-between ">
        <div className="text-FooterText text-[14px] py-[3px]">{text[0].name}</div>
        <div className="rounded-full bg-CustomGray w-[90px] h-[90px] flex items-center justify-center hover:bg-LightBlue transition duration-300 ease-in-out transform px-[15px] ">
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
