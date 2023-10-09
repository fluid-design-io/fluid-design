import { ColorMode } from "@/types/app";
import chroma from "chroma-js";

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
    case "hex":
      convertedColor = color.hex();
      break;
    case "rgb":
      convertedColor = color.css();
      break;
    case "hsl":
      convertedColor = color.css("hsl");
      break;
    default:
      convertedColor = color.hex();
  }
  // return the color
  return convertedColor;
};
