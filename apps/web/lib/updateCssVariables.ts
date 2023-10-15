import { BaseColors, ColorPalettes } from "@/types/app";
import {
  CSSType,
  generateCssVariables,
  getColorHsl,
} from "./generateCssVariables";

export async function updateCSSVariables(
  colorPalettes: ColorPalettes,
  baseColors: Omit<BaseColors, "gray">,
): Promise<void> {
  let styleElement;
  // Create or update a style element that contains the variables
  styleElement = document?.getElementById("dynamic-vars");
  if (!styleElement) {
    styleElement = document?.createElement("style");
    styleElement.id = "dynamic-vars";
    document?.head.appendChild(styleElement);
  }

  // Build the CSS text
  const cssText = `
      ${await generateCssVariables({
        type: CSSType.SHADCN,
        colorPalettes,
        baseColors,
      })}
      /* Selection */
      ::selection {
        color: hsl(var(--primary));
        background: hsl(var(--primary-foreground));
      }
      /* High contrast */
      @media (prefers-contrast: more) {
        :root {
          --border: ${getColorHsl(colorPalettes["gray"], 4)};
        }
        .dark {
          --border: ${getColorHsl(colorPalettes["gray"], 7)};
        }
      }
      /* Custom constant variables */
      ${await generateCssVariables({
        type: CSSType.RAW,
        colorPalettes,
        baseColors,
      })}
    `;

  // Inject the CSS text into the style element
  styleElement && (styleElement.textContent = cssText);
}
