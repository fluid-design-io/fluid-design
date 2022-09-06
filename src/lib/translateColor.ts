import chroma from 'chroma-js';

import { ColorMode } from './AppContext';

const toNearestTen = (num: number) => Math.round(num / 10) * 10;

export const translateColor = ({
  color,
  mode,
}: {
  color: chroma.Color;
  mode: ColorMode;
}) => {
  // create a switch statement to handle different color modes, assign the color to a variable
  let convertedColor;
  switch (mode) {
    case 'hex':
      convertedColor = color.hex();
      break;
    case 'rgb':
      convertedColor = color.css();
      break;
    case 'hsl':
      convertedColor = color.css('hsl');
      break;
    case 'lab':
      // eslint-disable-next-line no-case-declarations
      const lab = color.lab();
      convertedColor = `lab(${toNearestTen(lab[0])}% ${toNearestTen(
        lab[1]
      )} ${toNearestTen(lab[2])})`;
      break;
    case 'lch':
      // eslint-disable-next-line no-case-declarations
      const lch = color.lch();
      convertedColor = `lch(${toNearestTen(lch[0])}% ${toNearestTen(
        lch[1]
      )} ${toNearestTen(lch[2])})`;
      break;
    default:
      convertedColor = color.hex();
  }
  // return the color
  return convertedColor;
};
