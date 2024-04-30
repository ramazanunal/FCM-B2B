"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

const MobileMenu = ({ header }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMainMenu, setSelectedMainMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const toggleMainMenu = (index) => {
    if (selectedMainMenu === index) {
      setSelectedMainMenu(null);
    } else {
      setSelectedMainMenu(index);
    }
    setSelectedSubMenu(null);
  };

  const toggleSubMenu = (index) => {
    if (selectedSubMenu === index) {
      setSelectedSubMenu(null);
    } else {
      setSelectedSubMenu(index);
    }
  };

  return (
    <div className="block xl:hidden">
      <button className="w-[50px] h-[50px]" onClick={() => setIsMenuOpen(true)}>
        <GiHamburgerMenu className="text-CustomGray w-[20px] h-[20px]" />
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 left-56 mt-2 mr-4 z-30">
            <button onClick={() => setIsMenuOpen(false)}>
              <AiOutlineClose className="w-[15px] h-[15px] fill-BaseDark" />
            </button>
          </div>
          <div className="absolute left-0 top-0 h-full w-64 bg-white">
            <div id="mainmenuitem" className=" pb-24">
              <ul className="flex flex-col text-CustomGray">
                {header.mainMenuItems.map((mainMenuItem, index) => (
                  <li
                    key={mainMenuItem.id}
                    className="relative mr-[25px] leading-[1.3] mx-2"
                  >
                    <div
                      className="flex flex-row items-center justify-center"
                      onClick={() => toggleMainMenu(index)}
                    >
                      <span className="w-[53px] h-[53px] ">
                        {mainMenuItem.icon}
                      </span>
                      <span className="uppercase text-[12px] font-bold tracking-[1px] pb-[15px] hover:text-LightBlue transition duration-300 ease-in-out transform uppercase ">
                        {mainMenuItem.text}
                      </span>
                      {mainMenuItem.subMenus.length > 0 && (
                        <IoIosArrowForward className="w-5 h-5 text-black" />
                      )}
                    </div>
                    {selectedMainMenu === index && (
                      <ul>
                        {mainMenuItem.subMenus.map((subMenu) => (
                          <li key={subMenu.id}>
                            <Link href={subMenu.href}>{subMenu.text}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <ul>
              {header.menus.map((menu, index) => (
                <li key={menu.id}>
                  <Link href={menu.href}>{menu.text}</Link>
                  {menu.subMenus.length > 0 && (
                    <div
                      onClick={() => toggleSubMenu(index)}
                      className="cursor-pointer"
                    >
                      <IoIosArrowForward className="w-5 h-5 text-black" />
                    </div>
                  )}
                  {selectedSubMenu === index && (
                    <ul>
                      {menu.subMenus.map((subMenu) => (
                        <li key={subMenu.id}>
                          <Link href={subMenu.href}>{subMenu.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
