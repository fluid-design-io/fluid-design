import { generateColorPalette } from '@/lib/colorCalculator'
import { colorHelper } from '@/lib/colorHelper'
import { generateReadability } from '@/lib/generateReadability'

import { BaseColorTypes, ColorOptions } from '@/types/app'

export const generateColors = (colors: ColorOptions) => {
  const newBaseColors = {
    primary: colorHelper.toRaw(colors.primary),
    secondary: colorHelper.toRaw(colors.secondary),
    accent: colorHelper.toRaw(colors.accent),
  }
  const baseColors: BaseColorTypes[] = ['primary', 'secondary', 'accent', 'gray']
  // short-hand
  const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = baseColors.map((type) =>
    generateColorPalette({
      color: type === 'gray' ? newBaseColors.primary : newBaseColors[type],
      type,
    })
  )
  /* Calculate WCAG 2.0 */
  const palettesWithReadability = generateReadability({
    primaryPalette,
    secondaryPalette,
    accentPalette,
    grayPalette,
  })
  return {
    baseColors: newBaseColors,
    colorPalettes: palettesWithReadability,
  }
}
