/* 
  Create a context with the following properties:
  - colorMode: hex | rgb | hsl
  - setColorMode: function to set colorMode
  - baseColors: { primary: string, secondary: string, tertiary: string }
  - setBaseColors: (colors: { primary: string, secondary: string, tertiary: string }) => void
*/

import { useRouter } from 'next/router';
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
import { generateBaseColors } from './generateBaseColors';
import { ThemeProvider } from './ThemeContext';
import { unifiedTransitionTemporarily } from './useTheme';

export const ColorModes = {
  hex: 'hex',
  rgb: 'rgb',
  hsl: 'hsl',
  lab: 'lab',
  lch: 'lch',
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

export const useBaseColors = ({
  initialColors,
}: {
  initialColors: BaseColors;
}): [
  AppContextProps['baseColors'],
  ({
    primary,
    secondary,
    tertiary,
  }: AppContextProps['baseColors']) => void | null,
  () => void | null
] => {
  const { baseColors, setBaseColors } = useAppContext();
  const router = useRouter();

  const saveBaseColors = (baseColors: BaseColors) => {
    unifiedTransitionTemporarily();
    updateQuery(baseColors);
  };

  const randomize = () => {
    const newBaseColors = generateBaseColors();
    saveBaseColors(newBaseColors);
  };

  const updateQuery = (baseColors: BaseColors) => {
    router.push({ query: baseColors }, undefined, { shallow: true });
  };

  /* useEffect(() => {
    if (!baseColors || !baseColors.primary) {
      setBaseColors(initialColors);
    } else {
      saveBaseColors(baseColors);
    }
  }, [baseColors]); */

  useEffect(() => {
    if (!baseColors || !baseColors.primary) {
      setBaseColors(initialColors);
    }
    const handleRouteChange = (url, { shallow }) => {
      if (shallow) {
        // url looks like this: /?primary=%2396fa6a&secondary=%23a43ae7&tertiary=%23d68728
        // extract the colors from the url, not from the query object
        const primary = url.match(/primary=(.*?)&/)?.[1]?.replace('%23', '#');
        const secondary = url
          .match(/secondary=(.*?)&/)?.[1]
          ?.replace('%23', '#');
        const tertiary = url.match(/tertiary=(.*)/)?.[1]?.replace('%23', '#');

        if (primary && secondary && tertiary) {
          const newBaseColors = {
            primary: primary as string,
            secondary: secondary as string,
            tertiary: tertiary as string,
          };
          setBaseColors(newBaseColors);
        }
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return [baseColors, setBaseColors, randomize];
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
