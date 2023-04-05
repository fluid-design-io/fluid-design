/* 
  Create a context with the following properties:
  - colorMode: hex | rgb | hsl
  - setColorMode: function to set colorMode
  - baseColors: { primary: string, secondary: string, tertiary: string }
  - setBaseColors: (colors: { primary: string, secondary: string, tertiary: string }) => void
*/

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { colorStepMap } from './colorStepMap';
import { ThemeProvider } from './ThemeContext';

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

export type ColorValues = {
  palette: {
    primary: ColorValue[];
    secondary: ColorValue[];
    tertiary: ColorValue[];
    gray: ColorValue[];
  };
};

export interface AppContextProps {
  colorMode: ColorMode;
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
  baseColors: BaseColors;
  setBaseColors: ({
    primary,
    secondary,
    tertiary,
  }: {
    primary: string | undefined;
    secondary: string | undefined;
    tertiary: string | undefined;
  }) => void | null;
  colorValues: ColorValues;
  setColorValues: Dispatch<SetStateAction<ColorValues>>;
}

export interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextProps>({
  colorMode: 'hex',
  setColorMode: (): Dispatch<SetStateAction<ColorMode>> | undefined => null,
  baseColors: {
    primary: undefined,
    secondary: undefined,
    tertiary: undefined,
  },
  setBaseColors: ():
    | Dispatch<SetStateAction<AppContextProps['baseColors']>>
    | undefined => null,
  colorValues: {
    palette: {
      primary: [],
      secondary: [],
      tertiary: [],
      gray: [],
    },
  },
  setColorValues: ():
    | Dispatch<SetStateAction<AppContextProps['colorValues']>>
    | undefined => null,
});

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('hex');
  const [baseColors, setBaseColors] = useState<{
    primary: string | undefined;
    secondary: string | undefined;
    tertiary: string | undefined;
  }>({
    primary: undefined,
    secondary: undefined,
    tertiary: undefined,
  });
  const [colorValues, setColorValues] = useState<ColorValues>({
    palette: {
      primary: [],
      secondary: [],
      tertiary: [],
      gray: [],
    },
  });

  const value = {
    colorMode,
    setColorMode,
    baseColors,
    setBaseColors,
    colorValues,
    setColorValues,
  };
  return (
    <AppContext.Provider value={value}>
      <ThemeProvider>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  return useContext(AppContext);
};

export const useColorMode = (): [
  ColorMode,
  (mode: ColorMode) => void | null
] => {
  const { colorMode, setColorMode } = useAppContext();

  const saveColorMode = (mode: ColorMode) => {
    localStorage.setItem('colorMode', mode);
    setColorMode(mode);
  };

  useEffect(() => {
    if (!colorMode) {
      const mode = localStorage.getItem('colorMode');
      if (mode) {
        setColorMode(mode as ColorMode);
      } else {
        setColorMode('hex');
      }
    } else {
      saveColorMode(colorMode);
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export const useColorValues = (): [
  AppContextProps['colorValues'],
  Dispatch<SetStateAction<ColorValues>>
] => {
  const { colorValues, setColorValues } = useAppContext();

  const saveColorValues = (colorValues: AppContextProps['colorValues']) => {
    localStorage.setItem('colorValues', JSON.stringify(colorValues));
    setColorValues(colorValues);
    // set document css variables
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
  };

  useEffect(() => {
    if (Object.keys(colorValues.palette).length === 0) {
      const colors = localStorage.getItem('colorValues');
      if (colors) {
        const parsedColors = JSON.parse(colors);
        if (Object.keys(parsedColors).length === 1) {
          setColorValues(parsedColors);
        }
      }
    } else {
      saveColorValues(colorValues);
    }
  }, [colorValues]);

  return [colorValues, setColorValues];
};
