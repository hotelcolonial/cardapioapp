"use client";

import ArrowDownIcon from "../../../public/arrowDown.svg";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setSelectedLanguage } from "@/state";

const LanguageSelector = () => {
  const dispatch = useAppDispatch();

  const selectedLanguage = useAppSelector(
    (state) => state.global.selectedLanguage
  );

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          <p className="uppercase">{selectedLanguage}</p>
          <ArrowDownIcon width={"1rem"} height={"1rem"} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content space-y-3 font-semibold menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li
            className="hover:cursor-pointer"
            onClick={() => dispatch(setSelectedLanguage("pt"))}
          >
            Portugues
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => dispatch(setSelectedLanguage("es"))}
          >
            Español
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => dispatch(setSelectedLanguage("en"))}
          >
            English
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
