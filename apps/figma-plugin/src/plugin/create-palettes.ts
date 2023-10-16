import { ConfirmedPalettes } from "../app/store/store";
import { BASE_URL } from "../lib/constants";
import {
  ColorPalettes,
  CreatePaletteOptions,
  PluginStatus,
} from "../typings/core";
import { checkAndRunPremiumFeature } from "./checkPremiumTier";
import { hslToHex, generateColorVariables, hslToRgbFloat } from "./helper";

export const createPalettes = async ({
  url,
  options: { collectionName, darkMode, addSpacing },
  confirmedPalettes,
  isPaidFeature,
}: {
  url: string;
  options: CreatePaletteOptions;
  confirmedPalettes: ConfirmedPalettes;
  isPaidFeature: boolean;
}) => {
  figma.ui.postMessage({ type: PluginStatus.LOADING });
  // get token from url
  // http://localhost:3000/api/figma-plugin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5Ijp7ImgiOjI1LjE3LCJzIjowLjM3LCJsIjowLjE2LCJhIjoxfSwic2Vjb25kYXJ5Ijp7ImgiOjY4LjE3LCJzIjowLjU3LCJsIjowLjI3LCJhIjoxfSwiYWNjZW50Ijp7ImgiOjI5LjE3LCJzIjowLjYyLCJsIjowLjQyLCJhIjoxfSwiaWF0IjoxNjk3MzE4MjU2LCJleHAiOjE2OTc5MjMwNTZ9.ShxDtwAgfJizAjPgTNyeDxbFXmdTKaJg32coNa7Y7F4
  const token = url.split("?token=")[1];
  console.log(`====================================`);
  const apiUrl = `${BASE_URL}/api/figma-plugin/generate-color-palette?token=${token}`;
  console.log("making request to", apiUrl);
  const response = await fetch(apiUrl, {
    method: "GET",
  });
  const { data, error } = await response.json();
  console.log(`====================================`);
  console.log("data", data, error);
  if (error) {
    figma.ui.postMessage({
      type: PluginStatus.ERROR,
      message: data.error.message,
    });
    return;
  }
  const { colorPalettes } = data as {
    colorPalettes: ColorPalettes;
  };
  const spacing = addSpacing
    ? {
        spacing: {
          $type: "number",
          0: { $value: 0 },
          px: { $value: 1 },
          "0_5": { $value: 2 },
          1: { $value: 4 },
          "1_5": { $value: 6 },
          2: { $value: 8 },
          "2_5": { $value: 10 },
          3: { $value: 12 },
          "3_5": { $value: 14 },
          4: { $value: 16 },
          5: { $value: 20 },
          6: { $value: 24 },
          7: { $value: 28 },
          8: { $value: 32 },
          9: { $value: 36 },
          10: { $value: 40 },
          11: { $value: 44 },
          12: { $value: 48 },
          14: { $value: 56 },
          16: { $value: 64 },
          20: { $value: 80 },
          24: { $value: 96 },
          28: { $value: 112 },
          32: { $value: 128 },
          36: { $value: 144 },
          40: { $value: 160 },
          44: { $value: 176 },
          48: { $value: 192 },
          52: { $value: 208 },
          56: { $value: 224 },
          60: { $value: 240 },
          64: { $value: 256 },
          72: { $value: 288 },
          80: { $value: 320 },
          96: { $value: 384 },
        },
      }
    : null;
  const body = {
    color: {
      // converted structure
      /* 
        primary: {
            50: { $light: "#a2845e" },
            ...
        },
        secondary: {...},
        accent: {...},
        gray: {...},
        */
      ...Object.keys(colorPalettes).reduce((acc, key) => {
        acc[key] = colorPalettes[key].reduce(
          (acc, { step, raw }) => {
            const lightHex = hslToHex(raw.h, raw.s, raw.l);
            // !TODO Not sure if we swap the premitive values here or do it in the brand object
            // const darkStep = colorPalettes[key].length - index - 1;
            // const darkRaw = colorPalettes[key][darkStep].raw;
            // const darkHex = hslToHex(darkRaw.h, darkRaw.s, darkRaw.l);
            acc[step] = { $light: lightHex, $dark: lightHex };
            return acc;
          },
          {
            $type: "color",
          },
        );
        return acc;
      }, {}),

      brand: {
        $type: "color",
        background: { $dark: "{color.gray.950}", $light: "{color.gray.50}" },
        foreground: { $dark: "{color.gray.50}", $light: "{color.gray.950}" },
        card: { $dark: "{color.gray.950}", $light: "{color.gray.50}" },
        "card-foreground": {
          $dark: "{color.gray.50}",
          $light: "{color.gray.950}",
        },
        popover: { $dark: "{color.gray.950}", $light: "{color.gray.50}" },
        "popover-foreground": {
          $dark: "{color.gray.50}",
          $light: "{color.gray.950}",
        },
        primary: {
          $dark: "{color.primary.400}",
          $light: "{color.primary.600}",
        },
        "primary-foreground": {
          $dark: "{color.primary.900}",
          $light: "{color.primary.100}",
        },
        secondary: {
          $dark: "{color.secondary.900}",
          $light: "{color.secondary.200}",
        },
        "secondary-foreground": {
          $dark: "{color.secondary.100}",
          $light: "{color.secondary.900}",
        },
        muted: { $dark: "{color.gray.900}", $light: "{color.gray.100}" },
        "muted-foreground": {
          $dark: "{color.gray.400}",
          $light: "{color.gray.700}",
        },
        accent: { $dark: "{color.accent.800}", $light: "{color.accent.200}" },
        "accent-foreground": {
          $dark: "{color.accent.100}",
          $light: "{color.accent.900}",
        },
        border: { $dark: "{color.gray.800}", $light: "{color.gray.200}" },
        input: { $dark: "{color.gray.800}", $light: "{color.gray.200}" },
        ring: { $dark: "{color.gray.50}", $light: "{color.gray.950}" },
        "background-accent": {
          $dark: "{color.gray.900}",
          $light: "{color.gray.100}",
        },
      },
    },
    ...spacing,
  };

  const brandPalette = {
    background: colorPalettes.gray[0],
    foreground: colorPalettes.gray[10],
    card: colorPalettes.gray[0],
    "card-foreground": colorPalettes.gray[10],
    popover: colorPalettes.gray[0],
    "popover-foreground": colorPalettes.gray[10],
    primary: colorPalettes.primary[6],
    "primary-foreground": colorPalettes.primary[1],
    secondary: colorPalettes.secondary[2],
    "secondary-foreground": colorPalettes.secondary[9],
    muted: colorPalettes.gray[1],
    "muted-foreground": colorPalettes.gray[7],
    accent: colorPalettes.accent[2],
    "accent-foreground": colorPalettes.accent[9],
    border: colorPalettes.gray[2],
    input: colorPalettes.gray[2],
    ring: colorPalettes.gray[10],
    "background-accent": colorPalettes.gray[1],
  };

  console.log(`====================================`);
  console.log("body", body);

  if (isPaidFeature) {
    await checkAndRunPremiumFeature(() =>
      generateColorVariables({
        fileName: collectionName,
        body,
        options: {
          darkMode,
        },
      }),
    );
  }

  const BOX_WIDTH = 80;
  const BOX_HEIGHT = 40;
  const PADDING = 16;
  const BASE_PALETTES_TO_GENERATE = {
    ...(confirmedPalettes.primary ? { primary: colorPalettes.primary } : {}),
    ...(confirmedPalettes.secondary
      ? { secondary: colorPalettes.secondary }
      : {}),
    ...(confirmedPalettes.accent ? { accent: colorPalettes.accent } : {}),
    ...(confirmedPalettes.gray ? { gray: colorPalettes.gray } : {}),
  };
  /* 
  OBJECTIVE:
    - create a frame
    - for each base color
        - for each step
            - create a rectangle
            - set the fill color
            - set the name (e.g. Primary 50, Primary 100, etc.)
            - create a step text node
                - set to step value (e.g. 50, 100, etc.)
                - set the position
            - create a color text node
                - set to color text value (e.g. #FFFFFF)
                - set the position
            - create a group
                - group the rectangle, step text node, and color text node
        - create a baseColor frame
            - set group layout to autolayout flex horizontal
            - name the frame (e.g. Primary, Secondary, etc.)
    - if brand color palette is selected
        - repeat the above steps for brand color palette
        - modify the name as the key in brand color palette (e.g. Background, Foreground, etc.)
    - create a text node
    - set to "Generated by Fluid Color"
    - zoom to fit
  */

  //* Helper functions
  const createBaseColorFrame = (baseColor: string) => {
    const baseColorFrame = figma.createFrame();
    baseColorFrame.name = baseColor;
    baseColorFrame.layoutMode = "HORIZONTAL";
    baseColorFrame.counterAxisSizingMode = "AUTO";
    baseColorFrame.itemSpacing = 4;
    baseColorFrame.primaryAxisSizingMode = "AUTO";
    baseColorFrame.primaryAxisAlignItems = "CENTER";
    baseColorFrame.verticalPadding = 0;
    baseColorFrame.fills = [];
    return baseColorFrame;
  };

  const createPaletteFrame = ({
    paletteName: name,
    colorRect: { name: rectName, color: rectColor },
    paletteText: { title, color: colorText },
  }) => {
    const paletteFrame = figma.createFrame();
    paletteFrame.name = name;
    paletteFrame.layoutMode = "VERTICAL";
    paletteFrame.counterAxisSizingMode = "AUTO";
    paletteFrame.primaryAxisSizingMode = "AUTO";
    paletteFrame.primaryAxisAlignItems = "CENTER";
    paletteFrame.itemSpacing = 4;
    paletteFrame.verticalPadding = 0;
    paletteFrame.fills = [];

    //* create a rectangle
    const rect = createColorRect({
      color: rectColor,
      name: rectName,
    });
    //* create a color name text node
    const textNameString = createPaletteNameText(title);
    //* create color text node
    const textColorString = createPaletteColorText(colorText);

    paletteFrame.appendChild(rect);
    paletteFrame.appendChild(textNameString);
    paletteFrame.appendChild(textColorString);
    return paletteFrame;
  };

  const createColorRect = ({
    color,
    name,
  }: {
    color: { r: number; g: number; b: number };
    name: string;
  }) => {
    const rect = figma.createRectangle();
    rect.name = name;
    rect.cornerRadius = 7;
    rect.resize(BOX_WIDTH, BOX_HEIGHT);
    rect.fills = [
      {
        type: "SOLID",
        color,
      },
    ];
    //* set the border -> 1px use brandPalette.border
    rect.strokes = [
      {
        type: "SOLID",
        color: hslToRgbFloat(
          brandPalette.border.raw.h,
          brandPalette.border.raw.s,
          brandPalette.border.raw.l,
        ),
        opacity: 0.5,
      },
    ];
    return rect;
  };

  const createPaletteNameText = (name) => {
    const textNameString = figma.createText();
    textNameString.characters = name;
    textNameString.fontSize = 12;
    textNameString.fontName = {
      family: "Inter",
      style: "Semi Bold",
    };
    textNameString.fills = [
      {
        type: "SOLID",
        color: hslToRgbFloat(
          brandPalette.foreground.raw.h,
          brandPalette.foreground.raw.s,
          brandPalette.foreground.raw.l,
        ),
        opacity: 0.8,
      },
    ];
    return textNameString;
  };

  const createPaletteColorText = (name) => {
    const textColorString = figma.createText();
    textColorString.characters = name;
    textColorString.fontSize = 12;
    textColorString.fontName = {
      family: "Inter",
      style: "Regular",
    };
    textColorString.fills = [
      {
        type: "SOLID",
        color: hslToRgbFloat(
          brandPalette["muted-foreground"].raw.h,
          brandPalette["muted-foreground"].raw.s,
          brandPalette["muted-foreground"].raw.l,
        ),
      },
    ];
    // text overflow hidden, max width 80px
    textColorString.textAutoResize = "WIDTH_AND_HEIGHT";
    textColorString.layoutGrow = 0;
    textColorString.layoutAlign = "STRETCH";
    textColorString.textTruncation = "ENDING";
    return textColorString;
  };

  // import font
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  //* create figma palette using returned data
  // create a frame
  const frame = figma.createFrame();
  frame.cornerRadius = 28;
  frame.name = collectionName;
  frame.layoutMode = "VERTICAL";
  frame.counterAxisSizingMode = "AUTO";
  frame.layoutSizingHorizontal = "HUG";
  frame.layoutSizingVertical = "HUG";
  frame.itemSpacing = 4;
  frame.horizontalPadding = PADDING * 4;
  frame.paddingTop = PADDING * 2;
  frame.paddingBottom = PADDING * 4;
  frame.fills = [
    {
      type: "SOLID",
      // gray
      color: hslToRgbFloat(
        brandPalette.background.raw.h,
        brandPalette.background.raw.s,
        brandPalette.background.raw.l,
      ),
    },
  ];

  //* create a text node
  const title = figma.createText();
  title.characters = "Fluid Colors";
  title.fontSize = 56;
  title.fontName = {
    family: "Inter",
    style: "Semi Bold",
  };
  title.fills = [
    {
      type: "SOLID",
      // gray
      color: hslToRgbFloat(
        brandPalette.foreground.raw.h,
        brandPalette.foreground.raw.s,
        brandPalette.foreground.raw.l,
      ),
      opacity: 0.75,
    },
  ];
  title.lineHeight = {
    unit: "PERCENT",
    value: 160,
  };
  frame.appendChild(title);

  //* for each base color
  Object.keys(BASE_PALETTES_TO_GENERATE).forEach((baseColor, i) => {
    const baseColorPalette = colorPalettes[baseColor];
    //* create a baseColor frame
    const baseColorFrame = createBaseColorFrame(baseColor);
    baseColorFrame.layoutSizingHorizontal = "HUG";
    //* for each step
    baseColorPalette.forEach(({ step, color, raw }, j) => {
      const paletteFrame = createPaletteFrame({
        paletteName: `${baseColor}-${step}`,
        colorRect: {
          name: `${baseColor}-${step}-rect`,
          color: hslToRgbFloat(raw.h, raw.s, raw.l),
        },
        paletteText: {
          title: step.toString(),
          color: color,
        },
      });
      // insert into baseColorFrame
      baseColorFrame.appendChild(paletteFrame);
    });
    // insert into frame
    frame.appendChild(baseColorFrame);
  });

  //* if brand color palette is selected
  //   if (confirmedPalettes.brand) {
  //     const brandColorFrame = createBaseColorFrame("Brand");
  //     brandColorFrame.layoutSizingHorizontal = "HUG";

  //   }

  //* append to current page
  figma.currentPage.appendChild(frame);
  figma.viewport.scrollAndZoomIntoView([frame]);
  await new Promise((resolve) => setTimeout(resolve, 500));
  figma.ui.postMessage({ type: PluginStatus.COMPLETED });
};
