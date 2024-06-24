import { ColorMode, ColorPalettes } from '@/types/app'

import { CodeButtonTitle, generateCssVariables, getColorHsl } from './generateVariables'

export function updateCSSVariables(colorPalettes: ColorPalettes) {
  let styleElement
  // Create or update a style element that contains the variables
  styleElement = document?.getElementById('dynamic-vars')
  if (!styleElement) {
    styleElement = document?.createElement('style')
    styleElement.id = 'dynamic-vars'
    document?.head.appendChild(styleElement)
  }

  // Build the CSS text
  const cssText = `
      ${generateCssVariables({
        colorMode: ColorMode.HEX,
        colorPalettes,
        title: CodeButtonTitle.SHADCN,
      })}
      /* Selection */
      ::selection {
        color: hsl(var(--primary));
        background: hsl(var(--primary-foreground));
      }
      /* High contrast */
      @media (prefers-contrast: more) {
        :root {
          --border: ${getColorHsl(colorPalettes['gray'], 4)};
        }
        .dark {
          --border: ${getColorHsl(colorPalettes['gray'], 7)};
        }
      }
      /* Custom constant variables */
      ${generateCssVariables({
        colorMode: ColorMode.HEX,
        colorPalettes,
        title: CodeButtonTitle.RAW,
      })}
    `

  // Inject the CSS text into the style element
  styleElement && (styleElement.textContent = cssText)
}
