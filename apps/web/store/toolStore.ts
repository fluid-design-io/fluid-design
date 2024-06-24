import { ColorMode } from '@/types/app'
import { FinalColor } from 'extract-colors/lib/types/Color'
import { produce } from 'immer'
import { create } from 'zustand'
import { PersistOptions, createJSONStorage, devtools, persist } from 'zustand/middleware'

export enum PresistTool {
  IMAGE_COLOR_EXTRACTOR = 'imageColorExtractor',
}

export type ToolStore = {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  showReadability: boolean
  setShowReadability: (showReadability: boolean) => void
  openImageColorExtractor: boolean
  setOpenImageColorExtractor: (openImageColorExtractor: boolean) => void
  imageColorExtractor: {
    baseColors: FinalColor[]
    colors: FinalColor[]
  }
  updateImageColorExtractor: (things: { baseColors: FinalColor[]; colors: FinalColor[] }) => void
}

const localToolStorageOptions: PersistOptions<ToolStore> = {
  name: 'siteTool',
  storage: createJSONStorage(() => localStorage),
}

export const useToolStore = create<ToolStore>()(
  devtools(
    persist(
      (set, get) => ({
        colorMode: ColorMode.HEX,
        setColorMode: (colorMode) => set({ colorMode }),
        showReadability: false,
        setShowReadability: (showReadability) => set({ showReadability }),
        openImageColorExtractor: false,
        setOpenImageColorExtractor: (openImageColorExtractor) => set({ openImageColorExtractor }),
        imageColorExtractor: {
          image: null,
          baseColors: [],
          colors: [],
        },
        updateImageColorExtractor: ({ baseColors, colors }) => {
          set(
            produce((state) => {
              state.imageColorExtractor.baseColors = baseColors
              state.imageColorExtractor.colors = colors
            })
          )
        },
      }),
      localToolStorageOptions
    )
  )
)
