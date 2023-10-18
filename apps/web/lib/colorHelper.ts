import { BaseColors, ColorMode, RGB, RawColor } from "@/types/app";
import tinycolor from "tinycolor2";

const toHex = (color: string | RawColor): string =>
  tinycolor(color).toHexString();
const toRgba = (color: string | RawColor): string =>
  tinycolor(color).toRgbString();
const toHsla = (color: string | RawColor): string =>
  tinycolor(color).toHslString();
const toRgb = (color: string | RawColor): RGB => tinycolor(color).toRgb();

const toColorMode = (color: any, mode: ColorMode): string => {
  if (!tinycolor(color).isValid) return "#000";
  switch (mode) {
    case ColorMode.HEX:
      return toHex(color);
    case ColorMode.RGB:
      return toRgba(color);
    case ColorMode.HSL:
      return toHsla(color);
  }
};

/**
 * Returns a color that is suitable for use as a foreground color
 * @param color
 */
const toForeground = (color: string | RawColor): string => {
  const hsl = tinycolor(color).toHsl();
  const { h, s, l } = hsl;
  const lRounded = Math.round(l * 100);
  if (lRounded > 50) {
    return tinycolor(color).darken(35).toHslString();
  } else {
    return tinycolor(color).lighten(35).toHslString();
  }
};

const toRaw = (color: string): RawColor => {
  const { h, s, l, a } = tinycolor(color).toHsl();
  return { h, s, l, a };
};

const colorStringToBaseColors = (
  colorString: string,
): Omit<BaseColors, "gray"> => {
  const colors = colorString.split(",");
  const baseColors = {
    primary: colorHelper.toRaw(colors[0]),
    secondary: colorHelper.toRaw(colors[1]),
    accent: colorHelper.toRaw(colors[2]),
  };
  return baseColors;
};

export const colorHelper = {
  toHex,
  toRgba,
  toRgb,
  toHsla,
  toColorMode,
  toForeground,
  toRaw,
  colorStringToBaseColors,
};
