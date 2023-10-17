import {
  BaseColorTypes,
  BaseColors,
  CreatePaletteOptions,
  CustomVariableCollection,
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
  collections: CustomVariableCollection[];
  setStep: (step: Step) => void;
  setBaseColors: (baseColors: BaseColors) => void;
  setLoading: (loading: boolean) => void;
  setConfirmedPalettes: (confirmedPalettes: ConfirmedPalettes) => void;
  setGenerateOptions: (generateOptions: CreatePaletteOptions) => void;
  setIsPaidFeature: (isPaidFeature: boolean) => void;
  setUrlInput: (urlInput: string) => void;
  setCollections: (collections: CustomVariableCollection[]) => void;
  updateConfirmedPalette: (
    type: keyof ConfirmedPalettes,
    value: boolean,
  ) => void;
  updateGenerateOptions: (
    type: keyof CreatePaletteOptions,
    value: boolean | string,
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
      collectionId: undefined,
      darkMode: true,
      addSpacing: true,
    },
    urlInput:
      "http://localhost:3000/api/figma-plugin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5Ijp7ImgiOjI1Ni4wOSwicyI6MSwibCI6MC43MiwiYSI6MX0sInNlY29uZGFyeSI6eyJoIjo0NS4wOSwicyI6MC44NSwibCI6MC41MywiYSI6MX0sImFjY2VudCI6eyJoIjo0LjA5LCJzIjowLjYsImwiOjAuMzUsImEiOjF9LCJpYXQiOjE2OTc0ODE1OTQsImV4cCI6MTY5ODA4NjM5NH0.YtdyHv738b8T_vf5IwlvOTtumrUPn5_RztxSdNxqWN0",
    collections: [],
    setStep: (step) => set(() => ({ step })),
    setBaseColors: (baseColors) => set(() => ({ baseColors })),
    setLoading: (loading) => set(() => ({ loading })),
    setConfirmedPalettes: (confirmedPalettes) =>
      set(() => ({ confirmedPalettes })),
    setGenerateOptions: (generateOptions) => set(() => ({ generateOptions })),
    setIsPaidFeature: (isPaidFeature) => set(() => ({ isPaidFeature })),
    setUrlInput: (urlInput) => set(() => ({ urlInput })),
    setCollections: (collections) => set(() => ({ collections })),
    updateConfirmedPalette: (type, value) =>
      set(
        produce((state) => {
          state.confirmedPalettes[type] = value;
        }),
      ),
    updateGenerateOptions: (type, value) =>
      set(
        produce((state) => {
          state.generateOptions[type] = value;
        }),
      ),
  })),
);
