/* 
  Color Saturation Functions based on hue range,
  x = step (1-10), y = saturation
  345 - 15: RED y = 0.0076x^6 - 0.2422x^5 + 2.9831x^4 - 17.638x^3 + 52.063x^2 - 77.927x + 132.83
  15 - 31: ORANGE y = 0.002x^6 - 0.0695x^5 + 0.8757x^4 - 4.9266x^3 + 12.94x^2 - 17.593x + 91.633
  31 - 61.5: YELLOW y = -0.0081x^6 + 0.3039x^5 - 4.356x^4 + 29.812x^3 - 97.899x^2 + 135.17x + 22.567
  61.5 - 103: LIME GREEN y = 0.0058x^6 - 0.2044x^5 + 2.8085x^4 - 18.633x^3 + 61.74x^2 - 99.814x + 140.23
  103 - 147.5: GREEN y = 0.0006x^6 - 0.0113x^5 + 0.0006x^4 + 1.1268x^3 - 6.3573x^2 - 2.3929x + 93.767
  147.5 - 177: TEAL y = 0.0071x^6 - 0.2745x^5 + 4.0508x^4 - 28.716x^3 + 102.25x^2 - 177.92x + 198
  177 - 192: CYAN y = 0.0087x^6 - 0.3184x^5 + 4.4571x^4 - 29.668x^3 + 96.66x^2 - 147.89x + 167.9
  191 - 202.5: LIGHT BLUE y = 0.001x^6 - 0.0321x^5 + 0.3852x^4 - 1.9775x^3 + 5.1778x^2 - 14.893x + 93.067
  202.5 - 219.5: BLUE y = 0.0012x^6 - 0.0772x^5 + 1.4305x^4 - 11.265x^3 + 42.27x^2 - 79.902x + 147.5
  219.5 - 248.5: INDIGO y = 0.0009x^6 - 0.0498x^5 + 0.8633x^4 - 6.6715x^3 + 26.441x^2 - 55.998x + 99.233
  248.5 - 279: PURPLE y = 0.0029x^6 - 0.1316x^5 + 2.1223x^4 - 15.655x^3 + 55.797x^2 - 98.055x + 140.8
  279 - 310: MAGENTA y = 0.0028x^6 - 0.126x^5 + 2.0335x^4 - 14.998x^3 + 53.566x^2 - 95.03x + 139.47
  310 - 345:PINK y = 0.0031x^6 - 0.0992x^5 + 1.236x^4 - 7.3473x^3 + 22.042x^2 - 35.436x + 98.6
*/

const pow = Math.pow;

type ColorMinMax = {
  min: number;
  avg: number;
  max: number;
};

type Formula = {
  [key: string]: {
    formula: (x: number) => number;
  } & ColorMinMax;
};

const colorMinMax = {
  red: {
    min: 345,
    max: 15,
    avg: 0,
  },
  orange: {
    min: 0,
    max: 31,
    avg: 15,
  },
  yellow: {
    min: 31,
    max: 61.5,
    avg: 46.25,
  },
  limeGreen: {
    min: 61.5,
    max: 103,
    avg: 82.25,
  },
  green: {
    min: 103,
    max: 147.5,
    avg: 125.25,
  },
  teal: {
    min: 147.5,
    max: 177,
    avg: 162.25,
  },
  cyan: {
    min: 177,
    max: 192,
    avg: 184.5,
  },
  lightBlue: {
    min: 191,
    max: 202.5,
    avg: 196.75,
  },
  blue: {
    min: 202.5,
    max: 219.5,
    avg: 211,
  },
  indigo: {
    min: 219.5,
    max: 248.5,
    avg: 234,
  },
  purple: {
    min: 248.5,
    max: 279,
    avg: 263.75,
  },
  magenta: {
    min: 279,
    max: 310,
    avg: 294.5,
  },
  pink: {
    min: 310,
    max: 345,
    avg: 327.5,
  },
};

const formulaSaturation = {
  red: {
    ...colorMinMax.red,
    formula: (x: number) =>
      0.0076 * pow(x, 6) -
      0.2422 * pow(x, 5) +
      2.9831 * pow(x, 4) -
      17.638 * pow(x, 3) +
      52.063 * pow(x, 2) -
      77.927 * x +
      132.83,
  },
  orange: {
    ...colorMinMax.orange,
    formula: (x: number) =>
      0.002 * pow(x, 6) -
      0.0695 * pow(x, 5) +
      0.8757 * pow(x, 4) -
      4.9266 * pow(x, 3) +
      12.94 * pow(x, 2) -
      17.593 * x +
      91.633,
  },
  yellow: {
    ...colorMinMax.yellow,
    formula: (x: number) =>
      -0.0081 * pow(x, 6) +
      0.3039 * pow(x, 5) -
      4.356 * pow(x, 4) +
      29.812 * pow(x, 3) -
      97.899 * pow(x, 2) +
      135.17 * x +
      22.567,
  },
  limeGreen: {
    ...colorMinMax.limeGreen,
    formula: (x: number) =>
      0.0058 * pow(x, 6) -
      0.2044 * pow(x, 5) +
      2.8085 * pow(x, 4) -
      18.633 * pow(x, 3) +
      61.74 * pow(x, 2) -
      99.814 * x +
      140.23,
  },
  green: {
    ...colorMinMax.green,
    formula: (x: number) =>
      0.0006 * pow(x, 6) -
      0.0113 * pow(x, 5) +
      0.0006 * pow(x, 4) +
      1.1268 * pow(x, 3) -
      6.3573 * pow(x, 2) -
      2.3929 * x +
      93.767,
  },
  teal: {
    ...colorMinMax.teal,
    formula: (x: number) =>
      0.0071 * pow(x, 6) -
      0.2745 * pow(x, 5) +
      4.0508 * pow(x, 4) -
      28.716 * pow(x, 3) +
      102.25 * pow(x, 2) -
      177.92 * x +
      198,
  },
  cyan: {
    ...colorMinMax.cyan,
    formula: (x: number) =>
      0.0087 * pow(x, 6) -
      0.3184 * pow(x, 5) +
      4.4571 * pow(x, 4) -
      29.668 * pow(x, 3) +
      96.66 * pow(x, 2) -
      147.89 * x +
      167.9,
  },
  lightBlue: {
    ...colorMinMax.lightBlue,
    formula: (x: number) =>
      0.001 * pow(x, 6) -
      0.0321 * pow(x, 5) +
      0.3852 * pow(x, 4) -
      1.9775 * pow(x, 3) +
      5.1778 * pow(x, 2) -
      14.893 * x +
      93.067,
  },
  blue: {
    ...colorMinMax.blue,
    formula: (x: number) =>
      0.0012 * pow(x, 6) -
      0.0772 * pow(x, 5) +
      1.4305 * pow(x, 4) -
      11.265 * pow(x, 3) +
      42.27 * pow(x, 2) -
      79.902 * x +
      147.5,
  },
  indigo: {
    ...colorMinMax.indigo,
    formula: (x: number) =>
      0.0009 * pow(x, 6) -
      0.0498 * pow(x, 5) +
      0.8633 * pow(x, 4) -
      6.6715 * pow(x, 3) +
      26.441 * pow(x, 2) -
      55.998 * x +
      99.233,
  },
  purple: {
    ...colorMinMax.purple,
    formula: (x: number) =>
      0.0029 * pow(x, 6) -
      0.1316 * pow(x, 5) +
      2.1223 * pow(x, 4) -
      15.655 * pow(x, 3) +
      55.797 * pow(x, 2) -
      98.055 * x +
      140.8,
  },
  magenta: {
    ...colorMinMax.magenta,
    formula: (x: number) =>
      0.0028 * pow(x, 6) -
      0.126 * pow(x, 5) +
      2.0335 * pow(x, 4) -
      14.998 * pow(x, 3) +
      53.566 * pow(x, 2) -
      95.03 * x +
      139.47,
  },
  pink: {
    ...colorMinMax.pink,
    formula: (x: number) =>
      0.0031 * pow(x, 6) -
      0.0992 * pow(x, 5) +
      1.236 * pow(x, 4) -
      7.3473 * pow(x, 3) +
      22.042 * pow(x, 2) -
      35.436 * x +
      98.6,
  },
};

/* 
  Color Luminescence Function based on Hue range,
  x = step (1-10), y = luminescence
  345 - 15: RED y = 0.002x^6 - 0.0683x^5 + 0.8757x^4 - 5.3258x^3 + 16.261x^2 - 17.418x + 25.633
  15 - 31: ORANGE y = -0.0006x^6 + 0.0192x^5 - 0.278x^4 + 2.095x^3 - 7.8725x^2 + 19.395x + 5.6667
  31 - 61.5: YELLOW y = -0.0029x^6 + 0.1004x^5 - 1.3165x^4 + 8.1933x^3 - 24.836x^2 + 44.223x - 9.4
  61.5 - 103: LIME GREEN y = -0.0017x^6 + 0.054x^5 - 0.6649x^4 + 4.1384x^3 - 13.113x^2 + 25.816x - 2.2333
  103 - 147.5: GREEN y = 0.0048x^6 - 0.1592x^5 + 2.0297x^4 - 12.463x^3 + 38.186x^2 - 46.988x + 33.367
  147.5 - 177: TEAL y = -0.00007x^6 + 0.0013x^5 - 0.0373x^4 + 0.6823x^3 - 4.3981x^2 + 16.748x + 2.0333
  177 - 192: CYAN y = -0.0049x^6 + 0.1555x^5 - 1.9223x^4 + 11.827x^3 - 37.26x^2 + 61.091x - 16.833
  191 - 202.5: LIGHT BLUE y = -0.0003x^6 + 0.0103x^5 - 0.1436x^4 + 1.1711x^3 - 4.816x^2 + 14.616x + 13.233
  202.5 - 219.5: BLUE y = -0.0015x^6 + 0.0518x^5 - 0.7458x^4 + 5.449x^3 - 20.246x^2 + 40.312x - 3.8333
  219.5 - 248.5: INDIGO y = -0.0016x^6 + 0.0562x^5 - 0.8024x^4 + 5.909x^3 - 22.855x^2 + 47.824x - 4.1667
  248.5 - 279: PURPLE y = -0.0053x^6 + 0.1628x^5 - 1.9268x^4 + 11.081x^3 - 32.075x^2 + 49.95x - 9.2
  279 - 310: MAGENTA y = -0.0053x^6 + 0.1631x^5 - 1.909x^4 + 10.862x^3 - 31.257x^2 + 49.052x - 8.9667
  310 - 345: PINK y = 0.0019x^6 - 0.0633x^5 + 0.7794x^4 - 4.5006x^3 + 12.442x^2 - 8.0245x + 19.267
*/
const formulaLightness = {
  red: {
    ...colorMinMax.red,
    formula: (x: number) =>
      0.002 * pow(x, 6) -
      0.0683 * pow(x, 5) +
      0.8757 * pow(x, 4) -
      5.3258 * pow(x, 3) +
      16.261 * pow(x, 2) -
      17.418 * x +
      25.633,
  },
  orange: {
    ...colorMinMax.orange,
    formula: (x: number) =>
      -0.0006 * pow(x, 6) +
      0.0192 * pow(x, 5) -
      0.278 * pow(x, 4) +
      2.095 * pow(x, 3) -
      7.8725 * pow(x, 2) +
      19.395 * x +
      5.6667,
  },
  yellow: {
    ...colorMinMax.yellow,
    formula: (x: number) =>
      -0.0029 * pow(x, 6) +
      0.1004 * pow(x, 5) -
      1.3165 * pow(x, 4) +
      8.1933 * pow(x, 3) -
      24.836 * pow(x, 2) +
      44.223 * x -
      9.4,
  },
  limeGreen: {
    ...colorMinMax.limeGreen,
    formula: (x: number) =>
      -0.0017 * pow(x, 6) +
      0.054 * pow(x, 5) -
      0.6649 * pow(x, 4) +
      4.1384 * pow(x, 3) -
      13.113 * pow(x, 2) +
      25.816 * x -
      2.2333,
  },
  green: {
    ...colorMinMax.green,
    formula: (x: number) =>
      0.0048 * pow(x, 6) -
      0.1592 * pow(x, 5) +
      2.0297 * pow(x, 4) -
      12.463 * pow(x, 3) +
      38.186 * pow(x, 2) -
      46.988 * x +
      33.367,
  },
  teal: {
    ...colorMinMax.teal,
    formula: (x: number) =>
      -0.00007 * pow(x, 6) +
      0.0013 * pow(x, 5) -
      0.0373 * pow(x, 4) +
      0.6823 * pow(x, 3) -
      4.3981 * pow(x, 2) +
      16.748 * x +
      2.0333,
  },
  cyan: {
    ...colorMinMax.cyan,
    formula: (x: number) =>
      -0.0049 * pow(x, 6) +
      0.1555 * pow(x, 5) -
      1.9223 * pow(x, 4) +
      11.827 * pow(x, 3) -
      37.26 * pow(x, 2) +
      61.091 * x -
      16.833,
  },
  lightBlue: {
    ...colorMinMax.lightBlue,
    formula: (x: number) =>
      -0.0003 * pow(x, 6) +
      0.0103 * pow(x, 5) -
      0.1436 * pow(x, 4) +
      1.1711 * pow(x, 3) -
      4.816 * pow(x, 2) +
      14.616 * x +
      13.233,
  },
  blue: {
    ...colorMinMax.blue,
    formula: (x: number) =>
      -0.0015 * pow(x, 6) +
      0.0518 * pow(x, 5) -
      0.7458 * pow(x, 4) +
      5.449 * pow(x, 3) -
      20.246 * pow(x, 2) +
      40.312 * x -
      3.8333,
  },
  indigo: {
    ...colorMinMax.indigo,
    formula: (x: number) =>
      -0.0016 * pow(x, 6) +
      0.0562 * pow(x, 5) -
      0.8024 * pow(x, 4) +
      5.909 * pow(x, 3) -
      22.855 * pow(x, 2) +
      47.824 * x -
      4.1667,
  },
  purple: {
    ...colorMinMax.purple,
    formula: (x: number) =>
      -0.0053 * pow(x, 6) +
      0.1628 * pow(x, 5) -
      1.9268 * pow(x, 4) +
      11.081 * pow(x, 3) -
      32.075 * pow(x, 2) +
      49.95 * x -
      9.2,
  },
  magenta: {
    ...colorMinMax.magenta,
    formula: (x: number) =>
      -0.0053 * pow(x, 6) +
      0.1631 * pow(x, 5) -
      1.909 * pow(x, 4) +
      10.862 * pow(x, 3) -
      31.257 * pow(x, 2) +
      49.052 * x -
      8.9667,
  },
  pink: {
    ...colorMinMax.pink,
    formula: (x: number) =>
      0.0019 * pow(x, 6) -
      0.0633 * pow(x, 5) +
      0.7794 * pow(x, 4) -
      4.5006 * pow(x, 3) +
      12.442 * pow(x, 2) -
      8.0245 * x +
      19.267,
  },
};

/** Calculate the ratio between the closest two colors hue values
 and use that to interpolate the formula for the given input hue
 @param {number} inputHue - The input value
 @param {formula} formula - The formula to use
 @param {factor} factor - @defaultValue `1` Apply a factor to the result

 Example:
 If `inputHue` = `11`, which means we are between *red* (0) and *orange* (22), so we calculate the ratio between `11` and `22`,
 the answer is `0.5`, so we use the formula for orange and multiply it by `0.5`, and add the result to the formula for red and multiply it by `0.5`.
 Finally, apply the factor and return the result.
 Return the function that calculates the given input hue for the given hue.
*/
export const getUnionFormula = (
  inputHue: number,
  formula: Formula,
  factor = 1
) => {
  if (!inputHue) throw new Error('Hue must be a number');
  if (!formula) throw new Error('Formula is required');
  // convert the factor to a number between 0 and 1
  factor = factor > 1 ? factor * 0.01 : factor < 0 ? 0 : factor;
  const hue = inputHue % 360;
  const closestHues = Object.keys(formula).reduce(
    (acc, key) => {
      const { avg } = formula[key];
      const diff = Math.abs(hue - avg);
      return diff < acc.diff
        ? { diff, key, closerDiff: acc.diff, closerKey: acc.key }
        : acc;
    },
    { diff: Infinity, key: '', closerDiff: Infinity, closerKey: '' }
  );
  const { key, diff, closerKey, closerDiff } = closestHues;
  if (!formula[closerKey]) {
    return formula[key].formula; // if the hue is 0, there is no closer key
  }
  const ratio = Math.round((diff / (diff + closerDiff)) * 100) / 100;
  const closerFormula = formula[closerKey].formula;
  const formulaToUse = formula[key].formula;
  return (step: number) =>
    (ratio * formulaToUse(step) + (1 - ratio) * closerFormula(step)) * factor;
};

const numberBoundry = (num: number, min = 0, max = 100) =>
  Math.min(Math.max(num, min), max);

/**
  A function calculates saturation based on the given hue and step.
  @param {number} hue - a number between 0 and 360
  @param {number} saturation - a number between 0 and 1
  @param {number} step - a number between 1 and 11 (represents 50 - 950)
  @returns {number} a number between 0 and 100, in percentage
*/
export const calculateSaturation = (
  hue: number,
  saturation: number,
  step: number
) => {
  const saturationFormula = getUnionFormula(hue, formulaSaturation, saturation);
  const res = numberBoundry(saturationFormula(step + 1));
  return res;
};

/**
 * A function that returns color luminescence based on hue range and step
 * @param {number} hue - Hue value, 0-360
 * @param {number} luminance - Luminance value, 0-1
 * @param {number} step - Step value, 1-11 (1 = darkest, 11 = lightest)
 * @returns {number} - Luminescence value, 0-100
 */
export const getColorLuminescence = (
  hue: number,
  luminance: number,
  step: number
): number => {
  const lumInfluence = Math.round(luminance * 0.04 * 100) / 100 + 0.96;
  const luminescenceFormula = getUnionFormula(hue, formulaLightness);
  let res = numberBoundry(luminescenceFormula(step + 1));
  /* 
    Fixes for out liners based on Tailwind Color Palette ranges
    This means that no color within certain step will be lighter or darker than the range
  */
  // if (step === 1) {
  //   if (res > 13) res = 13;
  //   if (res < 7) res = 7;
  // }
  // if (step === 2) {
  //   if (res > 21) res = 21;
  //   if (res < 14) res = 14;
  // }
  // if (step === 3) {
  //   if (res > 36) res = 36;
  //   if (res < 20) res = 20;
  // }
  // if (step === 7) {
  //   if (res > 73) res = 73;
  //   if (res < 65) res = 65;
  // }
  // if (step === 8) {
  //   if (res > 80) res = 80;
  //   if (res < 73) res = 73;
  // }
  // if (step === 9) {
  //   if (res > 88) res = 88;
  //   if (res < 76) res = 76;
  // }
  // if (step === 10) {
  //   if (res > 94) res = 94;
  //   if (res < 87) res = 87;
  // }
  // if (step === 11) {
  //   if (res > 97) res = 97;
  //   if (res <= 94) res = 94;
  // }
  // Apply the luminance factor one more time to ensure the color is reflecting the luminance value
  res = Math.round(res * lumInfluence);

  return res;
};
