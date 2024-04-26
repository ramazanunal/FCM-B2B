"use client"
import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Link from "next/link";
import categoryStore from "@/utils/categoryStore";
import CategoryProducts from "../CategoryProducts";

function HomeCategories() {
  const categories = categoryStore((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white w-[1188px] pt-[60px] pb-[80px]">
      <div className="flex items-center justify-center mx-[35px] mb-[30px] px-[15px]">
        <ul className="flex flex-row">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`flex items-center justify-center text-[14px] font-bold rounded-full py-[22px] pr-[28px] pl-[28px] tracking-[1px]  h-[40px]  mx-[8px] mb-[8px] ${
                selectedCategory.id === category.id ? " border border-[3px] border-LightBlue text-LightBlue" : " border border-2 border-CategoriesTitle text-CategoriesTitle"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <button
                className="flex flex-row items-center justify-center "
              >
                <span>{category.name}</span>
                {/* <span>
                  <MdOutlineArrowDropDown />
                </span> */}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <CategoryProducts selectedCategory={selectedCategory} />

    </div>
  );
}

export default HomeCategories;
