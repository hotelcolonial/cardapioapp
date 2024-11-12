import Image from "next/image";
const Header = () => {
  return (
    <div className="mx-auto">
      <div className="h-[6.5rem] overflow-hidden mx-auto">
        <Image
          src={"/rest.png"}
          width={1280}
          height={800}
          alt="Restaurant picture"
        />
      </div>
      <div className="flex flex-col items-center py-5">
        <div className="space-y-1 text-center">
          <h1 className="font-vibes text-5xl">Hotel Colonial</h1>
          <p className="text-primary-gray font-quicksand text-xs">
            Restaurant - Bar - Cocktail bar
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
