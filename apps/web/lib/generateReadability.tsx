import { ColorPalettes, ColorValue } from "@/types/app";
import tinycolor from "tinycolor2";

export const generateReadability = ({
  foreground,
  background,
  primaryPalette,
  secondaryPalette,
  accentPalette,
  grayPalette,
}: {
  foreground: ColorValue;
  background: ColorValue;
  primaryPalette: ColorPalettes["primary"];
  secondaryPalette: ColorPalettes["secondary"];
  accentPalette: ColorPalettes["accent"];
  grayPalette: ColorPalettes["gray"];
}): ColorPalettes => {
  /* 
    ColorValue = {
    step: number;
    color: string;
    raw: RawColor;
    readability?: {
        foreground: ColorReadability;
        background: ColorReadability;
    };

    type ColorReadability = {
  readability: number;
  isReadable: boolean;
};

tinycolor refs:
readability: function(TinyColor, TinyColor) -> Object. Returns the contrast ratio between two colors.
isReadable: function(TinyColor, TinyColor, Object) -> Boolean. Ensure that foreground and background color combinations meet WCAG guidelines. 
}
    */
  const foregroundColor = tinycolor(foreground.color);
  const backgroundColor = tinycolor(background.color);
  // compare each color in the palette to the foreground and background
  // and insert the readability score into the palette
  const [primary, secondary, accent, gray] = [
    primaryPalette,
    secondaryPalette,
    accentPalette,
    grayPalette,
  ].map((palette) => {
    return palette.map((color) => {
      const colorValue = tinycolor(color.color);
      return {
        ...color,
        readability: {
          foreground: {
            readability:
              Math.round(
                tinycolor.readability(foregroundColor, colorValue) * 100,
              ) / 100,
            isReadable: tinycolor.isReadable(foregroundColor, colorValue),
          },
          background: {
            readability:
              Math.round(
                tinycolor.readability(backgroundColor, colorValue) * 100,
              ) / 100,
            isReadable: tinycolor.isReadable(backgroundColor, colorValue),
          },
        },
      };
    });
  });
  return {
    primary,
    secondary,
    accent,
    gray,
  };
};
