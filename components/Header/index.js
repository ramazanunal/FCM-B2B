"use client";
import React, { useState, useEffect } from "react";
import headerStore from "@/utils/headerStore";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "../MobileMenu";
import FixedHeader from "../FixedHeader";
import { FaSearch } from "react-icons/fa";
import SearchPanel from "../SearchPanel";
import { RiShoppingBasketFill } from "react-icons/ri";
import useCartItemCount from "@/utils/useCartItemCount";

const Header = () => {
  const { header } = headerStore();
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredMainMenu, setHoveredMainMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
  const [cartItemCount, setCartItemCount] = useCartItemCount(0);

  const toggleSearchPanel = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div id="header">
      <div className="hidden lg:flex items-center justify-between ">
        <div
          id="ustmenu"
          className="h-[45px] bg-DarkBlue max-w-[1200px] container "
        >
          <div className="px-[15px] mx-[35px] text-white">
            <div className="ml-[206px]">
              <ul className="flex flex-row text-[14px] font-semibold ">
                {header.menus.map((menu, index) => (
                  <li
                    key={menu.id}
                    className="relative mr-[25px] leading-[45px]"
                    onMouseEnter={() => setHoveredMenu(index)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <Link
                      className="hover:text-HoverGray transition duration-300 ease-in-out transform"
                      href={menu.href}
                    >
                      {menu.text}
                    </Link>
                    {/* Alt menüler */}
                    {hoveredMenu === index && (
                      <ul>
                        {menu.subMenus.length > 0 && (
                          <div className="absolute top-11 -left-4 z-10 w-[250px] bg-DarkBlue shadow-[0_5px_20px_rgba(0,0,0,0.3)] py-[15px] rounded-b-md">
                            {menu.subMenus.map((subMenu) => (
                              <ul key={subMenu.id}>
                                <li className="px-[15px] py-[10px] text-[14px] font-semibold leading-[14px] cursor-pointer hover:text-LightBlue transition duration-300 ease-in-out transform">
                                  <Link href={subMenu.href}>
                                    {subMenu.text}
                                  </Link>
                                </li>
                              </ul>
                            ))}
                          </div>
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        id="altmenu"
        className="p-[23px] lg:p-0 bg-white h-[165px] w-screen lg:w-full "
      >
        <div className="lg:p-[15px] md:mx-[35px] flex flex-row items-center justify-between">
          <div className="flex lg:hidden ">
            {/* Hamburger Menü */}
            <MobileMenu header={header} />
          </div>
          <div>
            <Image
              src={header.mainMenuLogo[0].logosrc}
              width={119}
              height={135}
              alt="Çalışkan Arı Mağaza"
              className="w-[93px] md:w-[119px] h-[105px] md:h-[135px]"
            />
          </div>
          <div className="flex flex-row hidden lg:flex pt-4" id="mainmenuitem">
            <ul className="flex flex-row items-center text-center justify-center text-CustomGray hidden lg:flex ml-[8px] md:ml-[36px]">
              {header.mainMenuItems.map((mainMenuItem, index) => (
                <li
                  key={mainMenuItem.id}
                  className={`relative mr-[25px] leading-[1.3] w-[117px] mx-2 `}
                  onMouseEnter={() => {
                    setHoveredMainMenu(index);
                    if (hoveredSubMenu !== null) {
                      setHoveredSubMenu(null);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredMainMenu(null);
                  }}
                >
                  <Link
                    className="  flex flex-col items-center justify-center hover:text-LightBlue  transition duration-500 ease-in-out transform"
                    href={mainMenuItem.href}
                  >
                    <span
                      className={`w-[53px] h-[53px] flex items-center justify-center ${
                        hoveredIcon === mainMenuItem.id
                          ? "motion-safe:animate-spin"
                          : ""
                      }`}
                    >
                      {mainMenuItem.icon}
                    </span>
                    <span
                      className="uppercase text-[12px] font-bold tracking-[1px] pb-[15px]"
                      onMouseEnter={() => setHoveredIcon(mainMenuItem.id)}
                      onMouseLeave={() => setHoveredIcon(null)}
                    >
                      {mainMenuItem.text}
                    </span>
                  </Link>

                  {mainMenuItem.subMenus &&
                    mainMenuItem.subMenus.length > 0 && (
                      <div
                        className={`absolute top-22 -left-4 z-[1000] w-[215px] bg-LightBlue shadow-[0_5px_20px_rgba(0,0,0,0.3)] py-[15px] rounded-md text-white transition-all duration-1000 ease-in-out transform ${
                          hoveredMainMenu === index
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10 pointer-events-none"
                        }`}
                      >
                        <ul>
                          {mainMenuItem.subMenus.map((subMenu) => (
                            <li
                              key={subMenu.id}
                              className="mx-[20px] py-[11px] text-[15px] font-bold leading-[14px] cursor-pointer hover:text-HoverGray transition duration-300 ease-in-out transform text-left"
                            >
                              <Link href={subMenu.href}>{subMenu.text}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-row items-center text-center justify-center text-CustomGray">
            {header.mainMenuButtons.map((mainMenuButtons) => (
              <div
                key={mainMenuButtons.id}
                className="flex flex-row items-center"
              >
                <button className="relative" onClick={toggleSearchPanel}>
                  <FaSearch className="w-[20px] h-[20px] hover:text-LightBlue hover:scale-110 transition duration-300 ease-in-out transform mr-[36px]" />
                </button>
                {isSearchOpen && (
                  <div className="absolute top-40 rounded-xl right-24 z-[1000]	bg-white">
                    <SearchPanel toggleSearchPanel={toggleSearchPanel} />
                  </div>
                )}
                <Link
                  className="flex flex-col items-center justify-center  hover:text-LightBlue hover:scale-110 transition duration-300 ease-in-out transform relative"
                  href="/cart"
                >
                  <span>
                    <RiShoppingBasketFill
                      style={{ width: "25px", height: "25px" }}
                    />
                  </span>
                  {cartItemCount > 0 && (
                    <div className="absolute -top-5 -right-5 bg-[#ff5b4b] rounded-full px-3 py-1">
                      <span className="text-white font-extrabold text-[14px] ">
                        {cartItemCount}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FixedHeader header={header} />
    </div>
  );
};

export default Header;
