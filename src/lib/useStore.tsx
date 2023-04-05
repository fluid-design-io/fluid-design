/* eslint-disable react-hooks/rules-of-hooks */
import { create } from 'zustand';

import { colorStepMap } from './colorStepMap';
import { generateBaseColors } from './generateBaseColors';

export type ColorValue =
  | {
      step: number;
      color: string;
      raw: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
    }
  | undefined;

export const ColorModes = {
  hex: 'hex',
  rgb: 'rgb',
  hsl: 'hsl',
};
export type ColorMode = keyof typeof ColorModes;
export type BaseColors = {
  primary: string | undefined;
  secondary: string | undefined;
  tertiary: string | undefined;
};

export type ColorValues = {
  palette: {
    primary: ColorValue[];
    secondary: ColorValue[];
    tertiary: ColorValue[];
    gray: ColorValue[];
  };
};

const initialState = {
  colorMode: 'hex',
  baseColors: {
    primary: undefined,
    secondary: undefined,
    tertiary: undefined,
  },
  colorValues: {
    palette: {
      primary: [],
      secondary: [],
      tertiary: [],
      gray: [],
    },
  },
};

export type AppContextProps = typeof initialState & {
  setColorMode: (mode: ColorMode) => void;
  setBaseColors: (colors: BaseColors) => void;
  randomize: () => void;
  setColorValues: (colorValues: ColorValues) => void;
};

export const useStore = create<AppContextProps>((set, get) => ({
  ...initialState,
  setColorMode: (mode: ColorMode) => {
    localStorage.setItem('colorMode', mode);
    set({ colorMode: mode });
  },
  setBaseColors: (colors: BaseColors) => {
    set({ baseColors: colors });
  },
  randomize: () => {
    const newBaseColors = generateBaseColors();
    get().setBaseColors(newBaseColors);
  },
  setColorValues: (colorValues: ColorValues) => {
    localStorage.setItem('colorValues', JSON.stringify(colorValues));
    set({ colorValues: colorValues });

    const { palette } = colorValues;
    Object.keys(palette).forEach((key) => {
      palette[key].forEach((value, index) => {
        if (value) {
          document.documentElement.style.setProperty(
            `--color-${key}-${colorStepMap[index]}`,
            `${value?.raw?.r} ${value?.raw?.g} ${value?.raw?.b}`
          );
        }
      });
    });
  },
}));
