import { BaseColors, ColorMode, ColorPalettes } from "@/types/app";
import {
  CodeButtonTitle,
  CodeGenerateType,
  generateCssVariables,
  getColorHsl,
} from "./generateVariables";

export async function updateCSSVariables(
  colorPalettes: ColorPalettes,
  baseColors: Omit<BaseColors, "gray">,
  colorMode: ColorMode,
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
        title: CodeButtonTitle.SHADCN,
        colorPalettes,
        baseColors,
        colorMode,
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
        title: CodeButtonTitle.RAW,
        colorPalettes,
        baseColors,
        colorMode,
      })}
    `;

  // Inject the CSS text into the style element
  styleElement && (styleElement.textContent = cssText);
}
