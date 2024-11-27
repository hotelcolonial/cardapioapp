"use client";

import Image from "next/image";
import { Key, useState, useEffect } from "react";
import EmblaCarousel from "@/components/menu/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Flowers from "../../../public/flower.svg";
import {
  useCreateCartItemMutation,
  useCreateCartMutation,
  useGetCartBySessionIdQuery,
  useGetMenuByTypeQuery,
} from "@/state/api";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import LanguageSelectorMenu from "@/components/menu/LanguageSelectorMenu";
import { useAppSelector } from "../redux";
import {
  addedToCartText,
  addToCartText,
  dishesText,
  drinksText,
  noDishesText,
  welcomeText,
} from "@/constants";
import Splash from "@/components/ui/Splash";

export default function MenuHome() {
  const [menuTypeId, setMenuTypeId] = useState(2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string>("");
  const [isCartCreated, setIsCartCreated] = useState(false);
  const [addedItems, setAddedItems] = useState<{ [key: number]: boolean }>({});

  const selectedLanguageMenu = useAppSelector(
    (state) => state.global.selectedLanguageMenu
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedUserId = localStorage.getItem("sessionId");
      if (!storedUserId) {
        storedUserId = uuidv4();
        localStorage.setItem("sessionId", storedUserId);
      }
      setSessionId(storedUserId);

      const cartCreatedStatus = localStorage.getItem("isCartCreated");
      if (cartCreatedStatus === "true") {
        setIsCartCreated(true);
      }

      const storedAddedItems = localStorage.getItem("addedItems");

      if (storedAddedItems) {
        const parsedItems = JSON.parse(storedAddedItems);

        if (parsedItems && Object.keys(parsedItems).length > 0) {
          setAddedItems(parsedItems);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("addedItems", JSON.stringify(addedItems));
    }
  }, [addedItems]);

  const { data: menuByType, refetch } = useGetMenuByTypeQuery(
    { menuTypeId },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const [createCart] = useCreateCartMutation();
  const [createCartItem] = useCreateCartItemMutation();
  const { data: cart } = useGetCartBySessionIdQuery({
    sessionId,
  });

  useEffect(() => {
    // Si isCartCreated es true pero no hay un carrito, crear uno nuevo
    if (isCartCreated && !cart) {
      createCart({ sessionId });
      localStorage.setItem("isCartCreated", "true");

      localStorage.setItem("addedItems", JSON.stringify({}));
    }

    // Si no hay carrito y no se ha creado uno, creamos un nuevo sessionId y carrito
    if (!cart && sessionId && !isCartCreated) {
      createCart({ sessionId });
      setIsCartCreated(true);
      localStorage.setItem("isCartCreated", "true");
    }
  }, [sessionId, createCart, cart, isCartCreated]);

  if (!menuByType || !menuByType.categories) {
    return <Splash />;
  }

  if (!sessionId) return <div>Loading...</div>;

  const SLIDES = menuByType.categories.map((category) => ({
    title: category.name,
    picUrl: category.picUrl || `/${category.name.en.toLowerCase()}.png`,
    items: category.dishes || [],
  }));

  const activeSlideItems = SLIDES[activeIndex]?.items || [];

  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleCategoryChange = (category: number) => {
    setMenuTypeId(category);
    setActiveIndex(0);
    refetch();
  };

  interface AddToCartParams {
    dishId: number; // ID del plato
    quantity: number; // Cantidad del plato
  }

  const handleAddToCart = ({ dishId, quantity }: AddToCartParams) => {
    console.log(cart?.id);
    const cartItemInfo = { id: cart?.id, dishId, quantity };
    createCartItem(cartItemInfo);
    setAddedItems((prev) => ({ ...prev, [dishId]: true }));
  };

  const OPTIONS: EmblaOptionsType = { align: "end" };

  return (
    <>
      <div className="flex justify-end mb-4 gap-4 lg:w-3/4 font-raleway">
        <LanguageSelectorMenu />
      </div>
      <div>
        <ul className="flex justify-center items-center font-raleway text-sm gap-3">
          <li
            className="cursor-pointer font-semibold relative group"
            onClick={() => handleCategoryChange(2)}
          >
            <h2>{dishesText[selectedLanguageMenu]}</h2>
            <span
              className={`absolute -bottom-1 left-0 w-0 h-[0.10rem] bg-primary-green transition-all duration-700 group-hover:w-full ${
                menuTypeId == 2 ? "w-full" : ""
              }`}
            ></span>
          </li>
          <li
            className="cursor-pointer font-semibold relative group"
            onClick={() => handleCategoryChange(1)}
          >
            <h2>{drinksText[selectedLanguageMenu]}</h2>
            <span
              className={`absolute -bottom-1 left-0 w-0 h-[0.10rem] bg-primary-green transition-all duration-700 group-hover:w-full ${
                menuTypeId == 1 ? "w-full" : ""
              }`}
            ></span>
          </li>
        </ul>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          onSlideClick={handleSlideClick}
          activeIndex={activeIndex}
          language={selectedLanguageMenu}
        />

        <div className="flex justify-between items-center flex-col py-10">
          <div className="padding-container max-w-3xl mx-center">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <div className="w-full h-[6.5rem] overflow-hidden">
                <Image
                  src={SLIDES[activeIndex]?.picUrl || "/rest.png"}
                  width={1280}
                  height={800}
                  alt="Restaurant picture"
                  className="w-fullobject-cover object-bottom"
                />
              </div>
              <div className="text-center flex justify-center py-4 items-center flex-col">
                <h2 className="text-3xl font-vibes">
                  {SLIDES[activeIndex]?.title[selectedLanguageMenu]}
                </h2>
                <div className="-mt-3">
                  <Flowers width={"6rem"} height={"2rem"} />
                </div>
              </div>
            </div>
          </div>
          <div className="py-10 space-y-3 w-full max-w-2xl">
            {activeSlideItems.length > 0 ? (
              activeSlideItems.map(
                (
                  item: {
                    id?: number;
                    name: { es: string; pt: string; en: string }; // Ajuste de tipo
                    price: number;
                    info: { es: string; pt: string; en: string };
                  },
                  index: Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-8"
                  >
                    <div className="w-3/4">
                      <h3 className="font-bold ">
                        {item.name[selectedLanguageMenu]}
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold font-raleway">
                        {item.info[selectedLanguageMenu]}
                      </p>
                    </div>
                    <div className="flex justify-center items-end flex-col">
                      <p className="text-primary-green font-bold">
                        R$ {item.price.toFixed(2)}
                      </p>
                      <button
                        className={`text-xs rounded-md hover:opacity-90 font-[500] py-2 px-4 w-full bg-primary-green text-gray-200 flex items-center gap-1 ${
                          addedItems[item.id ?? 0] && "bg-opacity-80"
                        }`}
                        onClick={() =>
                          handleAddToCart({
                            dishId: item.id ?? 0,
                            quantity: 1,
                          })
                        }
                        disabled={addedItems[item.id ?? 0]}
                      >
                        {addedItems[item.id ?? 0] ? (
                          <>
                            <span>
                              <TiTick />
                            </span>
                            {addedToCartText[selectedLanguageMenu]}
                          </>
                        ) : (
                          <>
                            <span>
                              <TiShoppingCart />
                            </span>
                            {addToCartText[selectedLanguageMenu]}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="padding-container">
                <p>{noDishesText[selectedLanguageMenu]}</p>
              </div>
            )}
          </div>
          <div className="padding-container pt-8">
            <p className="font-raleway text-sm text-center font-bold max-w-[18rem] text-primary-green">
              {welcomeText[selectedLanguageMenu]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
