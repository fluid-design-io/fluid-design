import { BaseColors, ColorMode, ColorOptions, RGB, RawColor } from '@/types/app'
import tinycolor from 'tinycolor2'

const toHex = (color: RawColor | string): string => tinycolor(color).toHexString()
const toRgba = (color: RawColor | string): string => tinycolor(color).toRgbString()
const toHsla = (color: RawColor | string): string => tinycolor(color).toHslString()
const toRgb = (color: RawColor | string): RGB => tinycolor(color).toRgb()

const toColorMode = (color: any, mode: ColorMode): string => {
  if (!tinycolor(color).isValid) return '#000'
  switch (mode) {
    case ColorMode.HEX:
      return toHex(color)
    case ColorMode.RGB:
      return toRgba(color)
    case ColorMode.HSL:
      return toHsla(color)
  }
}

/**
 * Returns a color that is suitable for use as a foreground color
 * @param color
 */
const toForeground = (color: RawColor | string): string => {
  const hsl = tinycolor(color).toHsl()
  const { h, l, s } = hsl
  const lRounded = Math.round(l * 100)
  if (lRounded > 50) {
    return tinycolor(color).darken(35).toHslString()
  } else {
    return tinycolor(color).lighten(35).toHslString()
  }
}

const toRaw = (color: string): RawColor => {
  const { a, h, l, s } = tinycolor(color).toHsl()
  return { a, h, l, s }
}

const colorStringToBaseColors = (colorString: string): Omit<BaseColors, 'gray'> => {
  const colors = colorString.split(',')
  const baseColors = {
    accent: colorHelper.toRaw(colors[2]),
    primary: colorHelper.toRaw(colors[0]),
    secondary: colorHelper.toRaw(colors[1]),
  }
  return baseColors
}

export const isValidBaseColorType = (color: string): boolean => ['accent', 'primary', 'secondary'].includes(color)

export const isValidBaseColors = (colors: ColorOptions): boolean => {
  const isKeyValid = Object.keys(colors).every(isValidBaseColorType)
  if (!isKeyValid) return false
  return Object.values(colors).every((color) => tinycolor(color).isValid())
}

export const areSearchParamColorsValid = (primary?: string, secondary?: string, accent?: string) => {
  if (!primary || !secondary || !accent) return false
  return tinycolor(primary).isValid() && tinycolor(secondary).isValid() && tinycolor(accent).isValid()
}

export const getContrastRatio = tinycolor.readability

export const colorHelper = {
  colorStringToBaseColors,
  toColorMode,
  toForeground,
  toHex,
  toHsla,
  toRaw,
  toRgb,
  toRgba,
  getContrastRatio,
}
