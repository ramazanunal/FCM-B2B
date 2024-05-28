import React from "react";
import Link from "next/link";
import { BiLogInCircle } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";

const WelcomeSection = () => {
  return (
    <div className="welcome-section p-6 text-center  flex flex-col my-12 w-[1188px]">
      <div className="max-w-6xl mx-auto">
        <div className="">
          <div className="flex flex-col items-center  mx-24 gap-12 text-CustomGray">
            <div className="flex max-w-[500px]">
              <p className="text-paragraphlight text-2xl leading-loose font-medium">
                Giriş yaparak harika içerikleri keşfedin ve kitap dünyasına adım
                atın!
              </p>
            </div>
            <div className="flex items-center">
              <Link href="/auth/login">
                <div className="group">
                  <button
                    type="button"
                    className="flex flex-row items-center justify-between gap-2 ml-3 text-white font-bold hover:scale-105 transition-all transform ease-out duration-500 cursor-pointer bg-CustomRed px-3 py-2 rounded-full relative  text-[18px] border-2 border-white ring ring-[4px]  ring-CustomRed w-[200px]"
                  >
                    <span className="ml-2 ">Giriş Yap</span>
                    <BiLogInCircle className="w-10 h-10" />
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mx-24 text-CustomGray mt-20">
          <div className="py-[50px] border rounded-2xl w-full md:w-1/3 flex flex-col items-center justify-center px-[60px] hover:scale-105  transition duration-700 ease-in-out transform">
            <div>
              <BiSolidBookContent className="w-[50px] h-[50px] text-LightBlue mb-[35px]" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[20px] font-bold">Kaliteli İçerik</p>
              <p className="text-[16px] text-paragraphlight text-center mt-[25px]">
                Her kitap özenle hazırlanmış içerikler sunar.
              </p>
            </div>
          </div>
          <div className="py-[50px] border rounded-2xl w-full md:w-1/3 flex flex-col items-center justify-center px-[60px] hover:scale-105  transition duration-700 ease-in-out transform">
            <div>
              <ImPriceTags className="w-[50px] h-[50px] text-LightBlue mb-[35px]" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[20px] font-bold">Uygun Fiyat</p>
              <p className="text-[16px] text-paragraphlight text-center mt-[25px]">
                Bütçenize uygun harika kitaplar.
              </p>
            </div>
          </div>
          <div className="py-[50px] border rounded-2xl w-full md:w-1/3 flex flex-col items-center justify-center px-[60px] hover:scale-105  transition duration-700 ease-in-out transform">
            <div>
              <TbTruckDelivery className="w-[50px] h-[50px] text-LightBlue mb-[35px]" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[20px] font-bold text-">Hızlı Teslimat</p>
              <p className="text-[16px] text-paragraphlight text-center mt-[25px]">
                Kitaplarınız kapınıza kadar gelir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
