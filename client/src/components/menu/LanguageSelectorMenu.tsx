"use client";

import { useState } from "react"; // Importa useState para manejar el estado local
import ArrowDownIcon from "../../../public/arrowDown.svg";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setSelectedLanguageMenu } from "@/state";
import { LanguageType } from "@/state/api";

const LanguageSelectorMenu = () => {
  const dispatch = useAppDispatch();
  const selectedLanguageMenu = useAppSelector(
    (state) => state.global.selectedLanguageMenu
  );

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura del dropdown

  const handleLanguageSelect = (language: LanguageType) => {
    dispatch(setSelectedLanguageMenu(language));
    setIsOpen(false); // Cierra el dropdown al seleccionar un idioma
  };

  return (
    <div>
      <div className="dropdown dropdown-end font-raleway">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
          onClick={() => setIsOpen((prev) => !prev)} // Alterna la apertura del dropdown
        >
          <p className="uppercase">{selectedLanguageMenu}</p>
          <ArrowDownIcon width={"1rem"} height={"1rem"} />
        </div>
        {isOpen && ( // Solo muestra el dropdown si isOpen es true
          <ul
            tabIndex={0}
            className="dropdown-content space-y-3 font-semibold menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li
              className="hover:cursor-pointer"
              onClick={() => handleLanguageSelect("pt")}
            >
              Portugues
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => handleLanguageSelect("es")}
            >
              Español
            </li>
            <li
              className="hover:cursor-pointer"
              onClick={() => handleLanguageSelect("en")}
            >
              English
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelectorMenu;
