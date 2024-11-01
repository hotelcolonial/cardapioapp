"use client";

const Navbar = () => {
  return (
    <header className="hidden lg:block p-4 dark:bg-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <div />
        <div className="flex items-center md:space-x-4">
          <div />
          <button
            type="button"
            className=" hidden bg-primary-gold opacity-80 h-10 w-10 font-semibold rounded-full lg:block dark:bg-violet-600 dark:text-gray-50"
          >
            H
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
