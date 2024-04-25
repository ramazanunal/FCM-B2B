"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import sliderStore from "@/utils/sliderStore";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const SliderComponent = () => {
  const images = sliderStore((state) => state.images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white pt-[30px]">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`w-full h-full ${index === currentImageIndex ? "" : "hidden"}`}
        >
          <Image src={image.src} alt={image.alt} width={1188} height={800} />
        </div>
      ))}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-12 ">
        <button onClick={goToPreviousImage} className="flex items-center justify-center rounded-md  shadow-[0_5px_20px_rgba(0,0,0,0.3)] py-[15px] bg-white w-[40px] h-[40px] hover:bg-opacity-50 transition duration-300 ease-in-out transform "><IoIosArrowBack className="text-2xl fill-BaseDark"/></button>
    
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-12">
      <button onClick={goToNextImage} className="flex items-center justify-center rounded-md  shadow-[0_5px_20px_rgba(0,0,0,0.3)] py-[15px] bg-white w-[40px] h-[40px] hover:bg-opacity-50 transition duration-300 ease-in-out transform "><IoIosArrowForward className="text-2xl fill-BaseDark "/></button>
      </div>
    </div>
  );
};

export default SliderComponent;
