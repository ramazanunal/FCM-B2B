"use client";
import React, { useState } from "react";
import headerStore from "@/utils/headerStore";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { header } = headerStore();
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredMainMenu, setHoveredMainMenu] = useState(null);

  return (
    <div>
      <div className="h-[45px] bg-DarkBlue max-w-[1200px] container">
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
                                <Link href={subMenu.href}>{subMenu.text}</Link>
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
      <div className="mx-[35px] px-[15px] flex flex-row items-center justify-between h-[165px] ">
        <div>
          <Image
            src={header.mainMenuLogo[0].logosrc}
            width={119}
            height={135}
            alt="Çalışkan Arı Mağaza"
          />
        </div>
        <div>
          <ul className="flex flex-row items-center text-center justify-center text-CustomGray">
            {header.mainMenuItems.map((mainMenuItem) => (
              <li
                key={mainMenuItem.id}
                className="relative mr-[25px] leading-[1.3] w-[117px] mx-2"
                onMouseEnter={() => setHoveredMainMenu(mainMenuItem.id)} 
                onMouseLeave={() => setHoveredMainMenu(null)}
              >
                <Link
                  className="flex flex-col items-center justify-center"
                  href={mainMenuItem.href}
                >
                  <span className="w-[53px] h-[53px] ">
                    {mainMenuItem.icon}
                  </span>
                  <span className="uppercase text-[12px] font-bold tracking-[1px] pb-[15px] hover:text-LightBlue transition duration-300 ease-in-out transform uppercase ">
                    {mainMenuItem.text}
                  </span>
                </Link>
                {hoveredMainMenu === mainMenuItem.id && (
                  <div className="relative ">
                    {mainMenuItem.subMenus &&
                      mainMenuItem.subMenus.length > 0 && (
                        <ul className="absolute top-0 -left-4 z-20 w-[215px] bg-LightBlue shadow-[0_5px_20px_rgba(0,0,0,0.3)] py-[15px] rounded-md text-white">
                          {mainMenuItem.subMenus.map((subMenu) => (
                            <li
                              key={subMenu.id}
                              className="mx-[20px] py-[11px] text-[15px] font-bold leading-[14px] cursor-pointer hover:text-HoverGray transition duration-300 ease-in-out transform text-left"
                            >
                              <Link href={subMenu.href}>{subMenu.text}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row items-center text-center justify-center text-CustomGray">
          {header.mainMenuButtons.map((mainMenuButtons) => (
            <div key={mainMenuButtons.id} className=" ">
              <Link
                className="flex flex-col items-center justify-center ml-[36px] hover:text-LightBlue transition duration-300 ease-in-out transform"
                href={mainMenuButtons.href}
              >
                <span className="">{mainMenuButtons.icon}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
