import Image from "next/image";

const Splash = () => {
  return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
      <Image
        alt="logo"
        src="/colonial-logo.png"
        width={130}
        height={130}
        className="splash-animation"
      />
    </div>
  );
};

export default Splash;
