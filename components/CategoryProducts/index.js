import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiShoppingBasketFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function CategoryProducts({ selectedCategory }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white w-[1188px] pt-[60px] pb-[80px]">
      <div className="flex flex-wrap justify-center">
        {selectedCategory.products.map((product, index) => (
          <div
            key={product.id}
            className="p-[25px] border border-ProductsBorder rounded-md shadow-sm "
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={product.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={product.imagesrc}
                alt={product.name}
                className="w-56 h-56 object-cover"
                width={210}
                height={210}
              />
            </Link>
            <div className="text-left pt-[15px]">
              <Link
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-bold text-[16px] text-CustomGray "
              >
                {product.name}
              </Link>
              {product.price && (
                <p className="italic text-LightBlue text-[23px] pt-[20px] font-semibold">
                  <span>₺</span>
                  {product.price}{" "}
                </p>
              )}
            </div>
            <div className="flex flex-row items-center justify-between mt-[10px]">
              <div
                className={`flex flex-row items-center justify-center text-LightBlue hover:text-CustomGray transition duration-300 ease-in-out transform`}
              >
                <span className="mr-2">
                  <RiShoppingBasketFill className="w-[22px] h-[22px]" />
                </span>
                <p className="text-[13px] font-bold leading-[1px] mt-[2px]">Sepete Ekle</p>
              </div>
              <div className={`flex flex-row items-center justify-center text-LightBlue  ${
                  hoveredIndex === index ? "opacity-100 transition duration-300 ease-in-out transform" : "opacity-0 transition duration-300 ease-in-out transform"
                }`}>
                <span>
                  <FaEye className="w-[22px] h-[22px] hover:text-CustomGray transition duration-300 ease-in-out transform" />
                </span>
                <span>
                  <FaRegHeart className="w-[22px] h-[22px] ml-[13px] hover:text-CustomGray transition duration-300 ease-in-out transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
