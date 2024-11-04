"use client";
import { useState } from "react";
import MenuSvg from "./MenuSvg";
import Link from "next/link";
import { adminMenuItems } from "@/constants";
import { usePathname } from "next/navigation";
const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathName = usePathname();
  const handleOpenMenu = () => {
    setOpenMenu((state) => !state);
  };
  return (
    <div className="lg:hidden font-raleway fixed top-0 w-full z-50">
      <div className="flex justify-between absolute left-0 right-0">
        <MenuSvg openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
      </div>
      <div
        className={`absolute left-0 top-0 h-screen bg-white bg-opacity-90 shadow-lg transition-all duration-[1200ms] ease-in-out transform ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 flex flex-col justify-center h-screen border border-r-soft-gray border-t-0">
          <div className="space-y-1 text-center mx-auto px-2 py-10">
            <h1 className="font-vibes text-4xl">Hotel Colonial</h1>
            <p className="text-primary-gray font-quicksand text-xs">
              Restaurant - Bar - Cocktail bar
            </p>
          </div>

          <aside>
            {adminMenuItems.map((item, index) => (
              <div key={index} className="px-6 py-3">
                <h2 className="text-xs mb-4 text-primary-gray">{item.title}</h2>
                <ul>
                  {item.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <p className="font-semibold w-full flex items-center">
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.label}
                      </p>
                      {link.submenu && (
                        <ul className="ml-2 mt-1">
                          {link.submenu.map((subItem, subIndex) => (
                            <li key={subIndex} className="w-full">
                              <Link
                                href={subItem.href ? subItem.href : "#"}
                                className={`hover:text-primary-green hover:font-bold hover:bg-opacity-80 text-sm py-1 px-1 w-full inline-block rounded-lg ${
                                  pathName === subItem.href &&
                                  "text-primary-green font-bold"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
          <button className="btn bg-primary-green bg-opacity-80 text-primary-white mt-auto m-4 w-full xl:w-4/5 text-sm relative left-0 mx-auto">
            Finalizar sessão
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileNav;
