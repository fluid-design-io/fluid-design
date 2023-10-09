import chroma from "chroma-js";
import { COLOR_LENGTH } from "./colorStepMap";
import { findClosestColors } from "./findColosestHues";
import { lightnessFormula } from "./lightnessFormula";
import { saturationsFormula } from "./saturationsFormula";
import { BaseColorTypes, ColorMode, ColorValue, RawColor } from "@/types/app";
import { colorHelper } from "./colorHelper";
import tinycolor from "tinycolor2";
import { formatHsl, converter } from "culori";

const calculateLightness = (
  inputHue: number,
  step: number,
  formulatLeftLightness: (x: number) => number,
  formulatRightLightness: (x: number) => number,
  colorLeftRatio: number,
  colorRightRatio: number,
  inputLightness: number,
) => {
  let res =
    (formulatLeftLightness(step) * colorLeftRatio +
      formulatRightLightness(step) * colorRightRatio) *
      0.97 +
    inputLightness * 0.03 * 100;
  if (step === 9) {
    // if inputHue is between green and purple, we will limit the lightness * 0.95
    if (inputHue > 70 && inputHue < 300) {
      res *= 0.95;
    }
    // if inputHue is between blue and violet, we will limit the lightness * 0.95 again
    if (inputHue > 200 && inputHue < 260) {
      res *= 0.95;
    }
  }
  if (step === 10) {
    // if inputHue is between green and purple, we will limit the lightness * 0.9
    if (inputHue > 70 && inputHue < 300) {
      res *= 0.9;
    }
    // if inputHue is between blue and violet, we will limit the lightness * 0.9 again
    if (inputHue > 200 && inputHue < 260) {
      res *= 0.9;
    }
  }

  return res;
};

export const getUnionFormula = (
  inputHue: number,
  inputSaturation: number,
  inputLightness: number,
) => {
  const [
    { color: colorLeftName, ratio: colorLeftRatio },
    { color: colorRightName, ratio: colorRightRatio },
  ] = findClosestColors(inputHue);
  const formulaLeftSaturation = saturationsFormula[colorLeftName];
  const formulaRightSaturation = saturationsFormula[colorRightName];
  const formulatLeftLightness = lightnessFormula[colorLeftName];
  const formulatRightLightness = lightnessFormula[colorRightName];
  return (step: number) => ({
    // we will take 90% of inputSaturation and 10% of the other color saturation
    saturation:
      (formulaLeftSaturation(step) * colorLeftRatio +
        formulaRightSaturation(step) * colorRightRatio) *
        0.1 +
      inputSaturation * 0.9 * 100,
    // we will take 3% of inputLightness and 97% of the other color lightness
    lightness: calculateLightness(
      inputHue,
      step,
      formulatLeftLightness,
      formulatRightLightness,
      colorLeftRatio,
      colorRightRatio,
      inputLightness,
    ),
  });
};

export const colorStep = (i) => (i === 0 ? 50 : i === 10 ? 950 : i * 100);

export const generateColorPalette = ({
  color,
  type,
  colorMode,
}: {
  color: RawColor;
  type: BaseColorTypes | "gray";
  colorMode: ColorMode;
}): ColorValue[] =>
  Array.from({ length: COLOR_LENGTH }, (_, i) => {
    const rawColor = chroma(color);
    let calculatedColor = rawColor;
    const step = i;
    const sat = rawColor.hsl()[1];
    const lig = rawColor.hsl()[2];
    if (type === "gray") {
      const oklchConverter = converter("oklch");
      const okhslConverter = converter("okhsl");
      const okhslColor = okhslConverter({ ...color, mode: "hsl" });
      const oklschColor = oklchConverter({ ...color, mode: "hsl" });
      let { h, s } = okhslColor;
      let { l } = oklschColor;
      l =
        (COLOR_LENGTH - 1 - i) * ((1 / COLOR_LENGTH) * 0.95) +
        1 / COLOR_LENGTH / 2;
      s = 0.02 + sat * 0.25;
      calculatedColor = chroma(formatHsl({ l, s, h, mode: "okhsl" }));
    } else {
      let hue = Math.round(rawColor.hsl()[0] * 10) / 10;
      // if hue is Nan, set it to 0
      if (isNaN(hue)) {
        calculatedColor = rawColor.set(
          "lch.l",
          (COLOR_LENGTH - 1 - i) * 8.85 + 5,
        );
      } else {
        hue === 360 ? (hue = 0.001) : hue;
        hue === 0 ? (hue = 0.001) : hue;
        // const saturation = calculateSaturation(hue, sat, COLOR_LENGTH - i);
        // const luminescence = getColorLuminescence(hue, lum, COLOR_LENGTH - i);
        const formula = getUnionFormula(hue, sat, lig);
        const { saturation, lightness } = formula(step);
        const colorString = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        calculatedColor = chroma(colorString);
      }
    }
    const convertedColor = colorHelper.toColorMode(
      calculatedColor.css("hsl"),
      colorMode,
    );
    return {
      step: colorStep(step),
      color: convertedColor,
      raw: tinycolor(convertedColor).toHsl() as RawColor,
    };
  });
