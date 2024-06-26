import { BaseColorTypes, ColorPalettes } from "@/types/app";

import { colorHelper } from "../colorHelper";
import { colorStepMap } from "../colorStepMap";

/* 
{
  "colors": {
    "primary": "rgb(120, 69, 172)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(240, 219, 255)",
    "onPrimaryContainer": "rgb(44, 0, 81)",
    "secondary": "rgb(102, 90, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(237, 221, 246)",
    "onSecondaryContainer": "rgb(33, 24, 42)",
    "tertiary": "rgb(128, 81, 88)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 221)",
    "onTertiaryContainer": "rgb(50, 16, 23)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(29, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(29, 27, 30)",
    "surfaceVariant": "rgb(233, 223, 235)",
    "onSurfaceVariant": "rgb(74, 69, 78)",
    "outline": "rgb(124, 117, 126)",
    "outlineVariant": "rgb(204, 196, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(50, 47, 51)",
    "inverseOnSurface": "rgb(245, 239, 244)",
    "inversePrimary": "rgb(220, 184, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 242, 251)",
      "level2": "rgb(244, 236, 248)",
      "level3": "rgb(240, 231, 246)",
      "level4": "rgb(239, 229, 245)",
      "level5": "rgb(236, 226, 243)"
    },
    "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
  }
}
*/
export const getColorRgb = <T extends BaseColorTypes>(
  palette: ColorPalettes[T],
  step: number,
): string => {
  const color = palette.find((color) => color.step === colorStepMap[step])
    ?.color;
  const { b, g, r } = colorHelper.toRgb(color);
  return `rgb(${r},${g},${b})`;
};

const generateRNPTokens = (colorPalettes: ColorPalettes) => {
  /**
   * Helper function to get a color from a palette
   * @param color
   * @param step 0-10
   * @returns
   */
  const g = (color: BaseColorTypes, step: number) =>
    getColorRgb(colorPalettes[color], step);
  const lightTheme: Record<string, any> = {
    backdrop: "rgba(51, 47, 55, 0.4)",
    background: g("gray", 0),
    elevation: {
      level0: "transparent",
      level1: g("gray", 1),
      level2: g("gray", 2),
      level3: g("gray", 3),
      level4: g("gray", 4),
      level5: g("gray", 5),
    },
    error: "rgb(186, 26, 26)",
    errorContainer: "rgb(255, 218, 214)",
    inverseOnSurface: g("gray", 1),
    inversePrimary: g("primary", 6),
    inverseSurface: g("gray", 9),
    onBackground: g("gray", 10),
    onError: "rgb(255, 255, 255)",
    onErrorContainer: "rgb(65, 0, 2)",
    onPrimary: g("primary", 0),
    onPrimaryContainer: g("primary", 9),
    onSecondary: g("secondary", 0),
    onSecondaryContainer: g("secondary", 9),
    onSurface: g("gray", 10),
    onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
    onSurfaceVariant: g("gray", 9),
    onTertiary: g("accent", 0),
    onTertiaryContainer: g("accent", 9),
    outline: g("gray", 2),
    outlineVariant: g("accent", 3),
    primary: g("primary", 6),
    primaryContainer: g("primary", 1),
    scrim: g("gray", 10),
    secondary: g("secondary", 6),
    secondaryContainer: g("secondary", 1),
    shadow: g("gray", 10),
    surface: g("gray", 0),
    surfaceDisabled: "rgba(29, 27, 30, 0.12)",
    surfaceVariant: g("gray", 1),
    tertiary: g("accent", 6),
    tertiaryContainer: g("accent", 1),
  };
  const darkTheme: Record<string, any> = {
    backdrop: "rgba(51, 47, 55, 0.4)",
    background: g("gray", 10),
    elevation: {
      level0: "transparent",
      level1: g("gray", 9),
      level2: g("gray", 8),
      level3: g("gray", 7),
      level4: g("gray", 6),
      level5: g("gray", 5),
    },
    error: "rgb(186, 26, 26)",
    errorContainer: "rgb(255, 218, 214)",
    inverseOnSurface: g("gray", 9),
    inversePrimary: g("primary", 6),
    inverseSurface: g("gray", 1),
    onBackground: g("gray", 0),
    onError: "rgb(255, 255, 255)",
    onErrorContainer: "rgb(65, 0, 2)",
    onPrimary: g("primary", 0),
    onPrimaryContainer: g("primary", 9),
    onSecondary: g("secondary", 0),
    onSecondaryContainer: g("secondary", 9),
    onSurface: g("gray", 0),
    onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
    onSurfaceVariant: g("gray", 1),
    onTertiary: g("accent", 0),
    onTertiaryContainer: g("accent", 9),
    outline: g("gray", 8),
    outlineVariant: g("accent", 3),
    primary: g("primary", 6),
    primaryContainer: g("primary", 1),
    scrim: g("gray", 0),
    secondary: g("secondary", 6),
    secondaryContainer: g("secondary", 1),
    shadow: g("gray", 0),
    surface: g("gray", 10),
    surfaceDisabled: "rgba(29, 27, 30, 0.12)",
    surfaceVariant: g("gray", 9),
    tertiary: g("accent", 6),
    tertiaryContainer: g("accent", 1),
  };
  const tokens = {
    dark: darkTheme,
    light: lightTheme,
  };

  return `export const tokens = ${JSON.stringify(tokens, null, 2)}`;
};

export default generateRNPTokens;
