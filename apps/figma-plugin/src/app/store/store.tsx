import {
  BaseColorTypes,
  BaseColors,
  CreatePaletteOptions,
  Step,
} from "../../typings/core";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: "bear-storage",
      },
    ),
  ),
);

/// Real Store

export type ConfirmedPalettes = Record<BaseColorTypes, boolean> & {
  brand: boolean;
};

export type AppState = {
  step: Step;
  baseColors: BaseColors;
  loading: boolean;
  confirmedPalettes: ConfirmedPalettes;
  generateOptions: CreatePaletteOptions;
  isPaidFeature: boolean;
  urlInput: string;
  setStep: (step: Step) => void;
  setBaseColors: (baseColors: BaseColors) => void;
  setLoading: (loading: boolean) => void;
  setConfirmedPalettes: (confirmedPalettes: ConfirmedPalettes) => void;
  setGenerateOptions: (generateOptions: CreatePaletteOptions) => void;
  setIsPaidFeature: (isPaidFeature: boolean) => void;
  setUrlInput: (urlInput: string) => void;
  updateConfirmedPalette: (
    type: keyof ConfirmedPalettes,
    value: boolean,
  ) => void;
};

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    step: Step.URL,
    baseColors: {
      primary: undefined,
      secondary: undefined,
      accent: undefined,
    },
    loading: false,
    isPaidFeature: false,
    confirmedPalettes: {
      primary: true,
      secondary: true,
      accent: true,
      gray: true,
      brand: true,
    },
    generateOptions: {
      enabled: true,
      collectionName: "My Color Palette",
      darkMode: true,
      addSpacing: true,
    },
    urlInput:
      "http://localhost:3000/api/figma-plugin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5Ijp7ImgiOjM0OC4zNCwicyI6MC43MywibCI6MC41MiwiYSI6MX0sInNlY29uZGFyeSI6eyJoIjozMi4zNCwicyI6MC41OCwibCI6MC42OCwiYSI6MX0sImFjY2VudCI6eyJoIjo5NS4zNCwicyI6MC4zMywibCI6MC43NiwiYSI6MX0sImlhdCI6MTY5NzM0OTA3OCwiZXhwIjoxNjk3OTUzODc4fQ.aYP3Kxp43pcoyQHFVDSv7Lt5EziNQQ6xs8YoP2J8IAw",
    setStep: (step) => set(() => ({ step })),
    setBaseColors: (baseColors) => set(() => ({ baseColors })),
    setLoading: (loading) => set(() => ({ loading })),
    setConfirmedPalettes: (confirmedPalettes) =>
      set(() => ({ confirmedPalettes })),
    setGenerateOptions: (generateOptions) => set(() => ({ generateOptions })),
    setIsPaidFeature: (isPaidFeature) => set(() => ({ isPaidFeature })),
    setUrlInput: (urlInput) => set(() => ({ urlInput })),
    updateConfirmedPalette: (type, value) =>
      set(
        produce((state) => {
          state.confirmedPalettes[type] = value;
        }),
      ),
  })),
);
