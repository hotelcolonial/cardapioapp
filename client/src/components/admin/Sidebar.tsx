"use client";

import { signOut } from "aws-amplify/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  links: {
    label: string;
    icon: JSX.Element;
    submenu: {
      label: string;
      href: string;
    }[];
  }[];
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  const pathName = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Error signing out");
    }
  };

  return (
    <div className="flex-1 hidden fixed font-raleway top-0 lg:flex flex-col justify-center min-h-screen h-full border border-r-soft-gray border-t-0">
      <div className="space-y-1 text-center mx-auto px-2 py-10">
        <h1 className="font-vibes text-4xl">Hotel Colonial</h1>
        <p className="text-primary-gray font-quicksand text-xs">
          Restaurant - Bar - Cocktail bar
        </p>
      </div>

      <aside>
        {menuItems.map((item, index) => (
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
      <button
        onClick={handleSignOut}
        className="btn bg-primary-green bg-opacity-80 text-primary-white mt-auto m-4 w-full xl:w-4/5 text-sm relative left-0 mx-auto"
      >
        Finalizar sessão
      </button>
    </div>
  );
};

export default Sidebar;
