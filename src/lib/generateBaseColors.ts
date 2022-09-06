import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';

export const generateBaseColors = () => {
  const randomSign = Math.random() < 0.5 ? -1 : 1;
  // a randome hue between 150 and 210
  const secondaryHue = Math.floor(Math.random() * 150) + 30;
  // a random darken between 10 and 30
  const secondaryDarken = Math.floor(Math.random() * 20) + 10;
  // a random hue between 35 and 75
  const tertiaryHue = Math.floor(Math.random() * 40) + 35;
  const tertiaryDarken = Math.floor(Math.random() * 25) + 5;

  const primaryColor = chroma.random().hex();
  const isDark = chroma(primaryColor).luminance() <= 0.5 ? -1 : 1;
  const saturation = chroma(primaryColor).get('hsl.s');
  const isSaturate = saturation < 0.5;

  const generateSecondaryColor = (primaryColor: string) =>
    tinycolor(primaryColor)
      .saturate(isSaturate ? 20 : -15)
      .darken(isDark * secondaryDarken)
      .spin(secondaryHue);

  const generateTertiaryColor = (primaryColor: string) =>
    tinycolor(primaryColor)
      .spin(isDark * tertiaryHue * randomSign)
      .darken(isDark * tertiaryDarken)
      .saturate(isSaturate ? 5 : -25);

  const checkColorIsValid = (color: tinycolor.Instance) => {
    const luminance = color.getLuminance();
    if (luminance < 0.01 || luminance > 0.99) {
      return false;
    }
    return true;
  };

  const secondaryColor = generateSecondaryColor(primaryColor);
  const tertiaryColor = generateTertiaryColor(primaryColor);

  // do {
  //   secondaryColor = generateSecondaryColor(primaryColor);
  // } while (!checkColorIsValid(secondaryColor));

  // do {
  //   tertiaryColor = generateTertiaryColor(primaryColor);
  // } while (!checkColorIsValid(tertiaryColor));

  console.log(
    primaryColor,
    secondaryColor.toHslString(),
    tertiaryColor.toHslString()
  );
  const initColors = {
    primary: primaryColor,
    secondary: secondaryColor.toHexString(),
    tertiary: tertiaryColor.toHexString(),
  };
  return initColors;
};
