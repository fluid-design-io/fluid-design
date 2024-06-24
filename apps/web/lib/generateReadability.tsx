import { ColorPalettes } from '@/types/app'
import tinycolor from 'tinycolor2'

export const generateReadability = ({
  accentPalette,
  grayPalette,
  primaryPalette,
  secondaryPalette,
}: {
  accentPalette: ColorPalettes['accent']
  grayPalette: ColorPalettes['gray']
  primaryPalette: ColorPalettes['primary']
  secondaryPalette: ColorPalettes['secondary']
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
  // compare each color in the palette to the foreground and background
  // and insert the readability score into the palette
  const [primary, secondary, accent, gray] = [primaryPalette, secondaryPalette, accentPalette, grayPalette].map(
    (palette) => {
      const foregroundColor = tinycolor(palette[0]?.color)
      const backgroundColor = tinycolor(palette[10]?.color)
      return palette.map((color) => {
        const colorValue = tinycolor(color?.color)
        return {
          ...color,
          readability: {
            background: {
              isReadable: tinycolor.isReadable(backgroundColor, colorValue),
              readability: Math.round(tinycolor.readability(backgroundColor, colorValue) * 100) / 100,
            },
            foreground: {
              isReadable: tinycolor.isReadable(foregroundColor, colorValue),
              readability: Math.round(tinycolor.readability(foregroundColor, colorValue) * 100) / 100,
            },
          },
        }
      })
    }
  )
  return {
    accent,
    gray,
    primary,
    secondary,
  } as ColorPalettes
}
