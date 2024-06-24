import { AppCSSVariables, BaseColorTypes, ColorMode, ColorPalettes } from '@/types/app'

import generateRNPTokens from './code-gen/generate-rnp-tokens'
import { colorHelper } from './colorHelper'
import { ColorStep, colorStepMap } from './colorStepMap'

export enum CodeGenerateType {
  CODEGEN = 'codegen',
  PLUGIN = 'plugin',
}
export enum CodeButtonTitle {
  FIGMA = 'Figma',
  RAW = 'Raw',
  REACT_NATIVE_PAPER = 'React Native Paper',
  SHADCN = 'shadcn/ui',
  TAILWINDCSS = 'Tailwind CSS',
  TAMAGUI = 'Tamagui',
  WEBFLOW = 'Webflow',
}

export const getColorHsl = <T extends BaseColorTypes>(palette: ColorPalettes[T], step: ColorStep): string => {
  const { h, l, s } = palette.find((color) => color.step === colorStepMap[step])?.raw || { h: 0, l: 0, s: 0 }
  const hRounded = Math.round(h * 100) / 100
  const sRounded = Math.round(s * 100)
  const lRounded = Math.round(l * 100)
  return `${hRounded} ${sRounded}% ${lRounded}%`
}

const generateShadcnCss = (colorPalettes: ColorPalettes) => {
  const g = (color: BaseColorTypes, step: ColorStep) => getColorHsl(colorPalettes[color], step)
  const darkTheme: Record<AppCSSVariables, string> = {
    '--accent': g('accent', 8),
    '--accent-foreground': g('accent', 1),
    '--background': g('gray', 10),
    '--background-accent': g('gray', 9),
    '--border': g('gray', 8),
    '--card': g('gray', 10),
    '--card-foreground': g('gray', 0),
    '--foreground': g('gray', 0),
    '--input': g('gray', 8),
    '--muted': g('gray', 9),
    '--muted-foreground': g('gray', 4),
    '--popover': g('gray', 10),
    '--popover-foreground': g('gray', 0),
    '--primary': g('primary', 4),
    '--primary-foreground': g('primary', 9),
    '--ring': g('gray', 0),
    '--secondary': g('secondary', 9),
    '--secondary-foreground': g('secondary', 1),
  }

  const lightTheme: Record<AppCSSVariables, string> = {
    '--accent': g('accent', 2),
    '--accent-foreground': g('accent', 9),
    '--background': g('gray', 0),
    '--background-accent': g('gray', 1),
    '--border': g('gray', 2),
    '--card': g('gray', 0),
    '--card-foreground': g('gray', 10),
    '--foreground': g('gray', 10),
    '--input': g('gray', 2),
    '--muted': g('gray', 1),
    '--muted-foreground': g('gray', 7),
    '--popover': g('gray', 0),
    '--popover-foreground': g('gray', 10),
    '--primary': g('primary', 6),
    '--primary-foreground': g('primary', 1),
    '--ring': g('gray', 10),
    '--secondary': g('secondary', 2),
    '--secondary-foreground': g('secondary', 9),
  }

  const cssText = `:root {
${Object.entries(lightTheme)
  .map(([variableName, value]) => `\t${variableName}: ${value};`)
  .join('\n')}
}
.dark {
${Object.entries(darkTheme)
  .map(([variableName, value]) => `\t${variableName}: ${value};`)
  .join('\n')}
}`
  return cssText
}

const generateRawCss = (colorPalettes: ColorPalettes) => {
  // using tailwindcss naming convention, e.g. --gray-100
  // total 4 base colors, 11 steps each
  const g = (color: BaseColorTypes, step: ColorStep) => getColorHsl(colorPalettes[color], step)
  const tailwindCss: Record<string, string> = ['gray', 'primary', 'secondary', 'accent'].reduce(
    (acc, color) => {
      for (let i = 0; i < 11; i++) {
        acc[`\t--${color}-${colorStepMap[i as ColorStep]}`] = g(color as BaseColorTypes, i as ColorStep)
      }
      return acc
    },
    {} as Record<string, string>
  )
  const cssText = `:root{
${Object.entries(tailwindCss)
  .map(([variableName, value]) => `${variableName}: ${value};`)
  .join('\n')}
}`
  return cssText
}

const generateTailwindCss = (colorPalettes: ColorPalettes, mode: ColorMode) => {
  const sanitize = (color: string) => {
    switch (mode) {
      case ColorMode.RGB:
        // remove rbg() and comma
        return color.replace(/rgb\(|\)/g, '').replace(/,/g, '')
      case ColorMode.HSL:
        return color.replace(/hsl\(|\)/g, '').replace(/,/g, '')
      default:
        return color
    }
  }
  const configValue = (variable: string) => {
    switch (mode) {
      case ColorMode.RGB:
        return `'rgb(var(--${variable}))'`
      case ColorMode.HSL:
        return `'hsl(var(--${variable}))'`
      default:
        return `'var(--${variable})'`
    }
  }
  const text = Object.entries(colorPalettes)
    .map(([colorName, colorPalette]) => {
      let paletteSection = `\t\t${colorName}: {\n`
      colorPalette.forEach((color) => {
        paletteSection += `\t\t\t${color.step}: ${configValue(colorName + '-' + color.step.toString())},\n`
      })
      paletteSection += '\t\t},\n'
      return paletteSection
    })
    .join('')

  return `
/* Define your CSS variables as channels */
// globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    ${Object.entries(colorPalettes)
      .map(([colorName, colorPalettes]) =>
        colorPalettes
          .map((color) => {
            return `\t--${colorName}-${color.step}: ${sanitize(colorHelper.toColorMode(color.raw, mode))};`
          })
          .join('\n')
      )
      .join('\n')}
  }
}

/* tailwind.config.js */

module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
${text}      },
    },
  },
};
`
}

export const generateCssVariables = ({
  colorMode,
  colorPalettes,
  title,
}: {
  colorMode: ColorMode
  colorPalettes: ColorPalettes
  title: CodeButtonTitle
}) => {
  switch (title) {
    case CodeButtonTitle.RAW:
      return generateRawCss(colorPalettes)
    case CodeButtonTitle.TAILWINDCSS:
      return generateTailwindCss(colorPalettes, colorMode)
    case CodeButtonTitle.SHADCN:
      return generateShadcnCss(colorPalettes)
    case CodeButtonTitle.REACT_NATIVE_PAPER:
      return generateRNPTokens(colorPalettes)
    case CodeButtonTitle.WEBFLOW:
      return ''
    default:
      return ''
  }
}
