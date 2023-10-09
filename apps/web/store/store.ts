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
} from "zustand/middleware";
import { generateColorPalette, getUnionFormula } from "@/lib/colorCalculator";
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

const queryParamStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.search);
    const storedValue = searchParams.get(key) ?? "";
    return storedValue || null;
  },
  setItem: (key, value): void => {
    const parsedValue = JSON.parse(value);

    // Extract and filter baseColors
    const { primary, secondary, accent } = parsedValue.state?.baseColors || {};

    // Create a filtered version of the state
    const filteredState = JSON.stringify({
      state: {
        baseColors: { primary, secondary, accent },
      },
      version: parsedValue.version,
    });

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, filteredState);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  },
};

let storageOptions = {
  name: "colors",
  storage: createJSONStorage(() => queryParamStorage),
};

let localAndUrlStore = (set, get) => ({
  colorMode: ColorMode.HSL,
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
    const { colorPalettes } = get();
    updateCSSVariables({
      primary: type === "primary" ? newPalette : colorPalettes.primary,
      secondary: type === "secondary" ? newPalette : colorPalettes.secondary,
      accent: type === "accent" ? newPalette : colorPalettes.accent,
      gray: grayPalette,
    });
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
    updateCSSVariables({
      primary: primaryPalette,
      secondary: secondaryPalette,
      accent: accentPalette,
      gray: grayPalette,
    });
  },
});

// Zustand store definition
export const useColorStore = create<ColorStore>()(
  devtools(persist(localAndUrlStore, storageOptions)),
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

let localStorageOptions = {
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
      localStorageOptions,
    ),
  ),
);
