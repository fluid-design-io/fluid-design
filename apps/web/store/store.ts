// import Zustand and immer
import { create } from "zustand";
import { produce } from "immer";
import {
  BaseColorTypes,
  BaseColors,
  ColorMode,
  ColorPalettes,
  ColorValue,
  RawColor,
} from "@/types/app";
import { generateBaseColors } from "@/lib/generateBaseColors";

import {
  persist,
  StateStorage,
  createJSONStorage,
  devtools,
  PersistOptions,
} from "zustand/middleware";
import { generateColorPalette } from "@/lib/colorCalculator";
import { updateCSSVariables } from "@/lib/updateCssVariables";

// Zustand store type
export type ColorStore = {
  colorMode: ColorMode;
  baseColors: Omit<BaseColors, "gray">;
  colorPalettes: ColorPalettes;
  setColorMode: (mode: ColorMode) => void;
  generatePalette: (existing?: boolean) => void;
  updateBaseColor: (newBaseColor: keyof BaseColors, newColor: RawColor) => void;
};

let localAndUrlStore = (set, get) => ({
  colorMode: ColorMode.HEX,
  baseColors: undefined,
  colorPalettes: {
    primary: [],
    secondary: [],
    accent: [],
    gray: [],
  },
  setColorMode: (mode) => set({ colorMode: mode }),
  updateBaseColor: (type: BaseColorTypes, newColor: RawColor) => {
    const [newPalette, grayPalette] = [
      generateColorPalette({
        color: newColor,
        type: type,
        colorMode: get().colorMode,
      }),
      generateColorPalette({
        color: type === "primary" ? newColor : get().baseColors.primary,
        type: "gray",
        colorMode: get().colorMode,
      }),
    ];
    set(
      produce((state: ColorStore) => {
        state.baseColors[type] = newColor;
        state.colorPalettes[type] = newPalette;
        state.colorPalettes.gray = grayPalette;
      }),
    );
    const { colorPalettes, baseColors, colorMode } = get();
    updateCSSVariables(
      {
        primary: type === "primary" ? newPalette : colorPalettes.primary,
        secondary: type === "secondary" ? newPalette : colorPalettes.secondary,
        accent: type === "accent" ? newPalette : colorPalettes.accent,
        gray: grayPalette,
      },
      baseColors,
      colorMode,
    );
  },
  generatePalette: (existing = false) => {
    const newBaseColors = existing ? get().baseColors : generateBaseColors();
    // short-hand
    const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = [
      "primary",
      "secondary",
      "accent",
      "gray",
    ].map((color) =>
      generateColorPalette({
        color: color === "gray" ? newBaseColors.primary : newBaseColors[color],
        type: color as BaseColorTypes,
        colorMode: get().colorMode,
      }),
    );
    set(
      produce((state: ColorStore) => {
        state.baseColors = newBaseColors;
        state.colorPalettes = {
          primary: primaryPalette,
          secondary: secondaryPalette,
          accent: accentPalette,
          gray: grayPalette,
        };
      }),
    );
    const { baseColors, colorMode } = get();
    updateCSSVariables(
      {
        primary: primaryPalette,
        secondary: secondaryPalette,
        accent: accentPalette,
        gray: grayPalette,
      },
      baseColors,
      colorMode,
    );
  },
});

const localColorStorageOptions: PersistOptions<ColorStore> = {
  name: "colorStore",
  storage: createJSONStorage(() => localStorage),
};

// Zustand store definition
export const useColorStore = create<ColorStore>()(
  devtools(persist(localAndUrlStore, localColorStorageOptions)),
);

/* Another store for site settings */

export enum Performance {
  low = "low",
  medium = "medium",
  high = "high",
}

export type SiteSettingsStore = {
  performance: Performance;
  setPerformance: (performance: Performance) => void;
};

const localSettingsStorageOptions: PersistOptions<SiteSettingsStore> = {
  name: "siteSettings",
  storage: createJSONStorage(() => localStorage),
};

export const useSiteSettingsStore = create<SiteSettingsStore>()(
  devtools(
    persist(
      (set, get) => ({
        performance: Performance.medium,
        setPerformance: (performance) => set({ performance }),
      }),
      localSettingsStorageOptions,
    ),
  ),
);
