"use client";

import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineMenuBook } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Header from "@/components/menu/Header";

const MenuWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <div className="flex justify-between flex-col min-h-screen">
      <div className="flex flex-col justify-center">
        <Header />
        {children}
      </div>
      <div className="flex justify-center gap-2 bg-gray-200 rounded-t-[3rem] text-primary-green font-quicksand font-semibold text-xs py-4 ">
        <Link
          href="/menu"
          className={`${
            pathName == "/menu" && "bg-primary-green text-white"
          } h-12 w-12 rounded-full flex justify-center items-center`}
        >
          <span>
            <BiSolidFoodMenu className=" text-2xl mx-auto" />
          </span>{" "}
        </Link>
        <Link
          href="/menu/cart"
          className={`${
            pathName == "/menu/cart" && "bg-primary-green text-white"
          } h-12 w-12 rounded-full flex justify-center items-center`}
        >
          <span>
            <TiShoppingCart className=" text-2xl mx-auto" />
          </span>{" "}
        </Link>
        <Link
          href="/menu/status"
          className={`${
            pathName == "/menu/status" && "bg-primary-green text-white"
          } h-12 w-12 rounded-full flex justify-center items-center`}
        >
          <span>
            <MdOutlineMenuBook className=" text-2xl mx-auto" />
          </span>{" "}
        </Link>
      </div>
    </div>
  );
};

export default MenuWrapper;
