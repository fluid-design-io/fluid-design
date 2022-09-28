/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ColorValues } from './AppContext';
import { windowExists } from './windowExists';

export type Mode = string | undefined | 'light' | 'dark';

interface ThemeContextProps {
  mode?: Mode;
  setMode?: Dispatch<React.SetStateAction<Mode>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(undefined);
  useEffect(() => {
    if (windowExists) {
      const localMode = window.localStorage.getItem('theme');
      if (localMode) {
        setMode(localMode);
      } else {
        const systemMode = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        setMode(systemMode);
      }
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}

export const useThemeMode = (
  usePreferences: boolean
): [
  Mode,
  React.Dispatch<React.SetStateAction<Mode>> | undefined,
  (() => void) | undefined
] => {
  const { mode, setMode } = useTheme();
  if (!usePreferences) return [undefined, undefined, undefined];

  const savePreference = (m: string) => localStorage.setItem('theme', m);
  // also save the time when the theme was last changed
  const saveTime = () => localStorage.setItem('theme-time', String(Date.now()));

  const toggleMode = () => {
    if (!mode) {
      return;
    }

    if (windowExists()) {
      document.documentElement.classList.toggle('dark');
    }

    savePreference(mode);
    saveTime();
    setMode(mode == 'dark' ? 'light' : 'dark');
  };

  if (usePreferences) {
    useEffect(() => {
      const userPreference =
        windowExists() &&
        !!window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const userMode =
        localStorage.getItem('theme') || (userPreference ? 'dark' : 'light');
      const userTime = localStorage.getItem('theme-time');

      // if the time is older than 24 hours, reset the theme to matchmedia
      if (
        userTime &&
        Date.now() - parseInt(userTime, 10) > 24 * 60 * 60 * 1000
      ) {
        savePreference(userPreference ? 'dark' : 'light');
      } else {
        if (userMode) {
          setMode(userMode);
        }
      }
    }, []);

    useEffect(() => {
      if (!mode) {
        return;
      }

      savePreference(mode);
      saveTime();

      if (!windowExists()) {
        return;
      }

      if (mode != 'dark') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }, [mode]);
  }

  return [mode, setMode, toggleMode];
};

export const saveMetaThemeColor = (colorValues: ColorValues) => {
  // <meta content="rgb(141 88 242)" media="(prefers-color-scheme: light)" name="theme-color">
  // <meta content="rgb(141 88 242)" media="(prefers-color-scheme: dark)" name="theme-color">
  if (colorValues.palette.gray) {
    const metaLight = document.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: light)"]'
    );
    const metaDark = document.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
    );
    if (metaLight && metaDark) {
      metaLight.setAttribute('content', colorValues.palette.gray[100].color);
      metaDark.setAttribute('content', colorValues.palette.gray[900].color);
    }
  }
};
