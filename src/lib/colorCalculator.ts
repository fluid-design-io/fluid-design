import { findClosestColors } from './findColosestHues';
import { lightnessFormula } from './lightnessFormula';
import { saturationsFormula } from './saturationsFormula';

const calculateLightness = (
  inputHue: number,
  step: number,
  formulatLeftLightness: (x: number) => number,
  formulatRightLightness: (x: number) => number,
  colorLeftRatio: number,
  colorRightRatio: number,
  inputLightness: number,
  colorLeftName: string,
  colorRightName: string
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
  inputLightness: number
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
      colorLeftName,
      colorRightName
    ),
  });
};
