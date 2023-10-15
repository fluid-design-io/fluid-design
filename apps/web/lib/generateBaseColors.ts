import { RawColor } from "@/types/app";
import tinycolor from "tinycolor2";

export const generateBaseColors = () => {
  const randomSign = Math.random() < 0.5 ? -1 : 1;
  // a randome hue between 150 and 210
  const secondaryHue = Math.floor(Math.random() * 150) + 30;
  // a random darken between 10 and 30
  const secondaryDarken = Math.floor(Math.random() * 15) + 10;
  // a random hue between 35 and 75
  const accentHue = Math.floor(Math.random() * 40) + 35;
  const accentDarken = Math.floor(Math.random() * 15) + 5;

  const primaryColor = tinycolor.random();
  const isDark = primaryColor.isDark() ? -1 : 1;
  const saturation = primaryColor.toHsl().s;
  const isSaturate = saturation < 0.5;

  const generateSecondaryColor = (primaryColor: any) =>
    primaryColor
      .saturate(isSaturate ? 20 : -15)
      .darken(isDark * secondaryDarken)
      .spin(secondaryHue)
      .toHsl() as RawColor;

  const generateAccentColor = (primaryColor: any) =>
    primaryColor
      .spin(isDark * accentHue * randomSign)
      .darken(isDark * accentDarken)
      .saturate(isSaturate ? 5 : -25)
      .toHsl() as RawColor;

  const primaryRawColor = primaryColor.toHsl() as RawColor;
  const secondaryRawColor = generateSecondaryColor(primaryColor);
  const accentRawColor = generateAccentColor(primaryColor);

  // round to 2 decimals
  let { h: pH, s: pS, l: pL, a: pA } = primaryRawColor;
  let { h: sH, s: sS, l: sL, a: sA } = secondaryRawColor;
  let { h: aH, s: aS, l: aL, a: aA } = accentRawColor;

  const primaryColorHSL = {
    h: Math.round(pH * 100) / 100,
    s: Math.round(pS * 100) / 100,
    l: Math.round(pL * 100) / 100,
    a: Math.round(pA * 100) / 100,
  };
  const secondaryColorHSL = {
    h: Math.round(sH * 100) / 100,
    s: Math.round(sS * 100) / 100,
    l: Math.round(sL * 100) / 100,
    a: Math.round(sA * 100) / 100,
  };
  const accentColorHSL = {
    h: Math.round(aH * 100) / 100,
    s: Math.round(aS * 100) / 100,
    l: Math.round(aL * 100) / 100,
    a: Math.round(aA * 100) / 100,
  };

  // to HSL
  const initColors = {
    primary: primaryColorHSL,
    secondary: secondaryColorHSL,
    accent: accentColorHSL,
  };
  return initColors;
};
