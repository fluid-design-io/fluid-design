import {
  AppCSSVariables,
  BaseColorTypes,
  BaseColors,
  ColorMode,
  ColorPalettes,
} from "@/types/app";
import { colorStepMap } from "./colorStepMap";
import { colorHelper } from "./colorHelper";
import generateFigmaUrlToken from "./code-gen/generate-figma-url-token";
import generateRNPTokens from "./code-gen/generate-rnp-tokens";

export enum CodeGenerateType {
  CODEGEN = "codegen",
  PLUGIN = "plugin",
}
export enum CodeButtonTitle {
  RAW = "Raw",
  TAILWINDCSS = "Tailwind CSS",
  SHADCN = "shadcn/ui",
  REACT_NATIVE_PAPER = "React Native Paper",
  WEBFLOW = "Webflow",
  FIGMA = "Figma",
  TAMAGUI = "Tamagui",
}

export const getColorHsl = <T extends BaseColorTypes>(
  palette: ColorPalettes[T],
  step: number,
): string => {
  const { h, s, l } = palette.find((color) => color.step === colorStepMap[step])
    ?.raw;
  const hRounded = Math.round(h * 100) / 100;
  const sRounded = Math.round(s * 100);
  const lRounded = Math.round(l * 100);
  return `${hRounded} ${sRounded}% ${lRounded}%`;
};

const generateShadcnCss = (colorPalettes: ColorPalettes) => {
  const g = (color: BaseColorTypes, step: number) =>
    getColorHsl(colorPalettes[color], step);
  const darkTheme: Record<AppCSSVariables, string> = {
    "--background": g("gray", 10),
    "--foreground": g("gray", 0),
    "--card": g("gray", 10),
    "--card-foreground": g("gray", 0),
    "--popover": g("gray", 10),
    "--popover-foreground": g("gray", 0),
    "--primary": g("primary", 4),
    "--primary-foreground": g("primary", 9),
    "--secondary": g("secondary", 9),
    "--secondary-foreground": g("secondary", 1),
    "--muted": g("gray", 9),
    "--muted-foreground": g("gray", 4),
    "--accent": g("accent", 8),
    "--accent-foreground": g("accent", 1),
    "--border": g("gray", 8),
    "--input": g("gray", 8),
    "--ring": g("gray", 0),
    "--background-accent": g("gray", 9),
  };

  const lightTheme: Record<AppCSSVariables, string> = {
    "--background": g("gray", 0),
    "--foreground": g("gray", 10),
    "--card": g("gray", 0),
    "--card-foreground": g("gray", 10),
    "--popover": g("gray", 0),
    "--popover-foreground": g("gray", 10),
    "--primary": g("primary", 6),
    "--primary-foreground": g("primary", 1),
    "--secondary": g("secondary", 2),
    "--secondary-foreground": g("secondary", 9),
    "--muted": g("gray", 1),
    "--muted-foreground": g("gray", 7),
    "--accent": g("accent", 2),
    "--accent-foreground": g("accent", 9),
    "--border": g("gray", 2),
    "--input": g("gray", 2),
    "--ring": g("gray", 10),
    "--background-accent": g("gray", 1),
  };

  const cssText = `:root {
${Object.entries(lightTheme)
  .map(([variableName, value]) => `\t${variableName}: ${value};`)
  .join("\n")}
}
.dark {
${Object.entries(darkTheme)
  .map(([variableName, value]) => `\t${variableName}: ${value};`)
  .join("\n")}
}`;
  return cssText;
};

const generateRawCss = (colorPalettes: ColorPalettes) => {
  // using tailwindcss naming convention, e.g. --gray-100
  // total 4 base colors, 11 steps each
  const g = (color: BaseColorTypes, step: number) =>
    getColorHsl(colorPalettes[color], step);
  const tailwindCss: Record<string, string> = [
    "gray",
    "primary",
    "secondary",
    "accent",
  ].reduce((acc, color) => {
    for (let i = 0; i < 11; i++) {
      acc[`\t--${color}-${colorStepMap[i]}`] = g(color as BaseColorTypes, i);
    }
    return acc;
  }, {});
  const cssText = `:root{
${Object.entries(tailwindCss)
  .map(([variableName, value]) => `${variableName}: ${value};`)
  .join("\n")}
}`;
  return cssText;
};

const generateTailwindCss = (colorPalettes: ColorPalettes, mode: ColorMode) => {
  const sanitize = (color) => {
    switch (mode) {
      case ColorMode.RGB:
        // remove rbg() and comma
        return color.replace(/rgb\(|\)/g, "").replace(/,/g, "");
      case ColorMode.HSL:
        return color.replace(/hsl\(|\)/g, "").replace(/,/g, "");
      default:
        return color;
    }
  };
  const configValue = (variable: string) => {
    switch (mode) {
      case ColorMode.RGB:
        return `'rgb(var(--${variable}))'`;
      case ColorMode.HSL:
        return `'hsl(var(--${variable}))'`;
      default:
        return `'var(--${variable})'`;
    }
  };
  const text = Object.entries(colorPalettes)
    .map(([colorName, colorPalette]) => {
      let paletteSection = `\t\t${colorName}: {\n`;
      colorPalette.forEach((color) => {
        paletteSection += `\t\t\t${color.step}: ${configValue(
          colorName + "-" + color.step.toString(),
        )},\n`;
      });
      paletteSection += "\t\t},\n";
      return paletteSection;
    })
    .join("");

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
            return `\t--${colorName}-${color.step}: ${sanitize(
              colorHelper.toColorMode(color.raw, mode),
            )};`;
          })
          .join("\n"),
      )
      .join("\n")}
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
`;
};

export const generateCssVariables = async ({
  title,
  colorPalettes,
  baseColors,
  colorMode,
}: {
  title: CodeButtonTitle;
  colorPalettes: ColorPalettes;
  baseColors: Omit<BaseColors, "gray">;
  colorMode: ColorMode;
}) => {
  switch (title) {
    case CodeButtonTitle.RAW:
      return generateRawCss(colorPalettes);
    case CodeButtonTitle.TAILWINDCSS:
      return generateTailwindCss(colorPalettes, colorMode);
    case CodeButtonTitle.SHADCN:
      return generateShadcnCss(colorPalettes);
    case CodeButtonTitle.REACT_NATIVE_PAPER:
      return generateRNPTokens(colorPalettes);
    case CodeButtonTitle.FIGMA:
      return await generateFigmaUrlToken(baseColors);
    case CodeButtonTitle.WEBFLOW:
      return "";
    default:
      return "";
  }
};
