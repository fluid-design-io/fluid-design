import { AppCSSVariables, BaseColorTypes, ColorPalettes } from "@/types/app";
import { colorStepMap } from "./colorStepMap";

export function updateCSSVariables(colorPalettes: ColorPalettes): void {
  // Create or update a style element that contains the variables
  let styleElement = document.getElementById("dynamic-vars");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "dynamic-vars";
    document.head.appendChild(styleElement);
  }

  const getColorHsl = (type: BaseColorTypes, step: number): string => {
    const { h, s, l } = colorPalettes[type].find(
      (color) => color.step === colorStepMap[step],
    )?.raw;
    const hRounded = Math.round(h * 100) / 100;
    const sRounded = Math.round(s * 100);
    const lRounded = Math.round(l * 100);
    return `${hRounded} ${sRounded}% ${lRounded}%`;
  };

  const darkTheme: Record<AppCSSVariables, string> = {
    "--background": getColorHsl("gray", 10),
    "--foreground": getColorHsl("gray", 0),
    "--card": getColorHsl("gray", 10),
    "--card-foreground": getColorHsl("gray", 0),
    "--popover": getColorHsl("gray", 10),
    "--popover-foreground": getColorHsl("gray", 0),
    "--primary": getColorHsl("primary", 4),
    "--primary-foreground": getColorHsl("primary", 9),
    "--secondary": getColorHsl("secondary", 9),
    "--secondary-foreground": getColorHsl("secondary", 1),
    "--muted": getColorHsl("gray", 9),
    "--muted-foreground": getColorHsl("gray", 4),
    "--accent": getColorHsl("accent", 8),
    "--accent-foreground": getColorHsl("accent", 1),
    "--border": getColorHsl("gray", 8),
    "--input": getColorHsl("gray", 8),
    "--ring": getColorHsl("gray", 0),
    "--background-accent": getColorHsl("gray", 9),
  };

  const lightTheme: Record<AppCSSVariables, string> = {
    "--background": getColorHsl("gray", 0),
    "--foreground": getColorHsl("gray", 10),
    "--card": getColorHsl("gray", 0),
    "--card-foreground": getColorHsl("gray", 10),
    "--popover": getColorHsl("gray", 0),
    "--popover-foreground": getColorHsl("gray", 10),
    "--primary": getColorHsl("primary", 6),
    "--primary-foreground": getColorHsl("primary", 1),
    "--secondary": getColorHsl("secondary", 2),
    "--secondary-foreground": getColorHsl("secondary", 9),
    "--muted": getColorHsl("gray", 1),
    "--muted-foreground": getColorHsl("gray", 7),
    "--accent": getColorHsl("accent", 2),
    "--accent-foreground": getColorHsl("accent", 9),
    "--border": getColorHsl("gray", 2),
    "--input": getColorHsl("gray", 2),
    "--ring": getColorHsl("gray", 10),
    "--background-accent": getColorHsl("gray", 1),
  };

  // using tailwindcss naming convention, e.g. --gray-100
  // total 4 base colors, 11 steps each
  const tailwindCss: Record<string, string> = [
    "gray",
    "primary",
    "secondary",
    "accent",
  ].reduce((acc, color) => {
    for (let i = 0; i < 11; i++) {
      acc[`--${color}-${colorStepMap[i]}`] = getColorHsl(
        color as BaseColorTypes,
        i,
      );
    }
    return acc;
  }, {});

  // Build the CSS text
  const cssText = `
      :root {
        ${Object.entries(lightTheme)
          .map(([variableName, value]) => `${variableName}: ${value};`)
          .join("\n")}
      }
      .dark {
        ${Object.entries(darkTheme)
          .map(([variableName, value]) => `${variableName}: ${value};`)
          .join("\n")}
      }
      /* Selection */
      ::selection {
        color: hsl(var(--primary));
        background: hsl(var(--primary-foreground));
      }
      /* High contrast */
      @media (prefers-contrast: more) {
        :root {
          --border: ${getColorHsl("gray", 4)};
        }
        .dark {
          --border: ${getColorHsl("gray", 7)};
        }
      }
      /* Custom constant variables */
      :root{
        ${Object.entries(tailwindCss)
          .map(([variableName, value]) => `${variableName}: ${value};`)
          .join("\n")}
      }
    `;

  // Inject the CSS text into the style element
  styleElement.textContent = cssText;
}
