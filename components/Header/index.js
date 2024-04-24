"use client";
import React, { useState } from "react";
import headerStore from "@/utils/headerStore";
import Link from "next/link";

const Header = () => {
  const { header } = headerStore();

  // Menü üzerine gelindiğinde alt menüyü göstermek için state
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
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
                  className="hover:text-gray-400 transition duration-300 ease-in-out transform"
                  href={menu.href}
                >
                  {menu.text}
                </Link>
                {/* Alt menüler */}
                {hoveredMenu === index && ( // Eğer mouse menünün üzerindeyse alt menüyü göster
                  <ul>
                    {menu.subMenus.length > 0 && (
                      <div className="absolute top-11 -left-4 z-10 w-[250px] bg-DarkBlue shadow-md py-[15px] rounded-b-md">
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
  );
};

export default Header;
