import { getColorNames } from '@/app/actions'
import { generateColors } from '@/data/generate-colors'
import { ColorNames, ColorOptions, GeneratedColors } from '@/types/app'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// Zustand store type
export type ColorStore = {
  primary: string
  secondary: string
  accent: string
  colors: GeneratedColors
  colorNames: ColorNames
  generateColorNames: (colors: ColorNames) => Promise<ColorNames>
  generateColors: (colors: ColorOptions) => GeneratedColors
  setColor: (type: 'primary' | 'secondary' | 'accent', color: string) => void
  setColors: (colors: GeneratedColors) => void
  setColorNames: (colorNames: ColorNames) => void
  setBaseColors: (colors: { primary: string; secondary: string; accent: string }) => void
}

export type ColorsHydrateValues = Pick<ColorStore, 'primary' | 'secondary' | 'accent' | 'colors' | 'colorNames'>

export const createColorStore = (props: ColorsHydrateValues) =>
  create<ColorStore>()(
    immer((set) => ({
      ...props,
      generateColors,
      generateColorNames: async (colors) => {
        return await getColorNames(colors)
      },
      setColor: (type, color) => set({ [type]: color }),
      setColors: (colors) => set({ colors }),
      setColorNames: (colorNames) => set({ colorNames }),
      setBaseColors: (colors) => set({ ...colors }),
    }))
  )
