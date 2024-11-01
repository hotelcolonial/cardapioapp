"use client";

import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import MobileNav from "@/components/admin/MobileNav";
import { adminMenuItems } from "@/constants";

export default function AdminProps({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <MobileNav />
      <Sidebar menuItems={adminMenuItems} />
      <div className="lg:ml-[300px] flex-[4] px-6 py-3">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
