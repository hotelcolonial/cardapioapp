import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageType } from "./api";

export interface initialStateTypes {
  selectedLanguage: LanguageType;
  selectedLanguageMenu: LanguageType;
}

const initialState: initialStateTypes = {
  selectedLanguage: "pt",
  selectedLanguageMenu: "pt",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSelectedLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.selectedLanguage = action.payload;
    },
    setSelectedLanguageMenu: (state, action: PayloadAction<LanguageType>) => {
      state.selectedLanguageMenu = action.payload;
    },
  },
});

export const { setSelectedLanguage, setSelectedLanguageMenu } =
  globalSlice.actions;

export default globalSlice.reducer;
