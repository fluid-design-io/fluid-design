export enum ColorMode {
  HEX = 'hex',
  RGB = 'rgb',
  HSL = 'hsl',
}

export type RawColor = {
  h: number
  s: number
  l: number
  a: number
}

export type RGB = {
  r: number
  g: number
  b: number
}

export type ColorNames = string[]

export type BaseColorTypes = 'primary' | 'secondary' | 'accent' | 'gray'

export type BaseColors = Record<BaseColorTypes, RawColor>

export type ColorOptions = Omit<Record<BaseColorTypes, string>, 'gray'>

export type GeneratedColors = {
  baseColors: {
    primary: RawColor
    secondary: RawColor
    accent: RawColor
  }
  colorPalettes: ColorPalettes
}

export type ColorReadability = {
  readability: number
  isReadable: boolean
}

export enum CVDType {
  DeficiencyProt = 'protanomaly and protanopia',
  DeficiencyDeuter = 'deuteranomaly and deuteranopia',
  DeficiencyTrit = 'tritanomaly and tritanopia',
}

export type ColorValue = {
  step: number
  color: string
  raw: RawColor
  /**
   * Readability is calculated using the WCAG 2.0 formula
   * Compares the contrast ratio between the foreground and background colors
   */
  readability?: {
    foreground: ColorReadability
    background: ColorReadability
  }
}

export type ColorPalettes = Record<BaseColorTypes, ColorValue[]>

export type AppCSSVariables =
  | '--background'
  | '--foreground'
  | '--card'
  | '--card-foreground'
  | '--popover'
  | '--popover-foreground'
  | '--primary'
  | '--primary-foreground'
  | '--secondary'
  | '--secondary-foreground'
  | '--muted'
  | '--muted-foreground'
  | '--accent'
  | '--accent-foreground'
  | '--border'
  | '--input'
  | '--ring'
  | '--background-accent'
