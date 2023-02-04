import { create } from 'zustand';

import { windowExists } from './windowExists';

// convert to zustand
export type Mode = string | undefined | 'light' | 'dark';
interface ThemeContextProps {
  mode?: Mode;
  toggleMode?: () => void;
}
export function unifiedTransitionTemporarily() {
  document.documentElement.classList.add('[&_*]:!transition-1000');
  window.setTimeout(() => {
    document.documentElement.classList.remove('[&_*]:!transition-1000');
  }, 0);
}

export const isSystemDarkMode = () => {
  if (!windowExists()) return false;
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const isLocalStorageExists = window.localStorage.isDarkMode;
  const isLocalStorageDarkMode = window.localStorage.isDarkMode === 'true';
  const isSystemDarkMode = darkModeMediaQuery.matches;
  // if localStorage exists, return it, otherwise return system
  return isLocalStorageExists ? isLocalStorageDarkMode : isSystemDarkMode;
};

export const useTheme = create<ThemeContextProps>((set) => ({
  mode: isSystemDarkMode() ? 'dark' : 'light',
  toggleMode: () => {
    unifiedTransitionTemporarily();
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    const isSystemDarkMode = darkModeMediaQuery.matches;
    const isDarkMode = document.documentElement.classList.toggle('dark');

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }
    set({ mode: isDarkMode ? 'dark' : 'light' });
  },
}));
