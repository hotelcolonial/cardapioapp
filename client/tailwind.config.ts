import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-gold": "#d4af37",
        "primary-green": "#006039",
        "primary-white": "#FCF5E5",
        "primary-gray": "#808080",
        "soft-gray": "#e6e6e6",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        raleway: ["Raleway", "serif"],
        vibes: ["Great Vibes", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
