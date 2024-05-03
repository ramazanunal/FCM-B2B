"use client";
import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import categoryStore from "@/utils/categoryStore";
import CategoryProducts from "../CategoryProducts";

function HomeCategories() {
  const categories = categoryStore((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white w-[1188px] pt-[60px] pb-[80px] ">
      <div className="flex items-center justify-center mx-[35px] mb-[22px] lg:mb-[22px] px-[15px]">
        <div className="h-[60px] lg:h-[0px]">
          <button
            className={`z-10 lg:hidden flex flex-col items-left justify-center text-[14px] font-bold tracking-[1px] h-[40px] border border-[3px] border-LightBlue text-LightBlue rounded-[22px] w-[300px]  pl-[20px] ${
              isDropdownOpen ? " h-fit z-10 py-[2px]" : "py-[22px]  "
            }`}
            onClick={toggleDropdown}
          >
            <div className="flex flex-row h-[40px] items-center justify-center">
              {selectedCategory.name}
              <MdOutlineArrowDropDown className={`w-6 h-6`} />
            </div>
            {isDropdownOpen && (
              <ul className="flex flex-col items-left">
                {categories
                  .filter((category) => category.id !== selectedCategory.id)
                  .map((category) => (
                    <li
                      key={category.id}
                      className={`h-[40px] text-[14px] font-bold tracking-[1px] flex   items-center justify-center hover:text-LightBlue hover:scale-105 transition duration-300 ease-in-out transform cursor-pointer ${
                        selectedCategory.id === category.id
                          ? " text-LightBlue "
                          : " text-CategoriesTitle"
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            )}
          </button>

          <ul className="hidden lg:flex flex-row">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`flex items-center justify-center text-[14px] font-bold rounded-full py-[22px] pr-[28px] pl-[28px] tracking-[1px]  h-[40px]  mx-[8px] mb-[8px] hover:scale-105 transition duration-300 ease-in-out transform cursor-pointer ${
                  selectedCategory.id === category.id
                    ? " border border-[3px] border-LightBlue text-LightBlue"
                    : " border border-2 border-CategoriesTitle text-CategoriesTitle"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center mt-[70px]">
      <CategoryProducts selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default HomeCategories;
