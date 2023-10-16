import { ConfirmedPalettes } from "../app/store/store";
import { BASE_URL } from "../lib/constants";
import {
  ColorPalettes,
  CreatePaletteOptions,
  PluginStatus,
  RawColor,
} from "../typings/core";
import { checkAndRunPremiumFeature } from "./checkPremiumTier";
import { hslToHex, generateColorVariables, hslToRgbFloat } from "./helper";

export const createPalettes = async ({
  url,
  options: { collectionName, darkMode, addSpacing, enabled: variablesEnabled },
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

  // ------------------ VARIABLES ------------------
  let collectionId;
  let variables: Variable[] = [];

  if (isPaidFeature && variablesEnabled) {
    await checkAndRunPremiumFeature(() => {
      try {
        collectionId = generateColorVariables({
          fileName: collectionName,
          body,
          options: {
            darkMode,
          },
        });
      } catch (error) {
        console.log(error);
        if (error.message.includes("Limited to")) {
          figma.notify("This document is limited to 1 mode", {
            timeout: 5000,
          });
          collectionId = generateColorVariables({
            fileName: collectionName,
            body,
            options: {
              darkMode: false,
            },
          });
          return;
        } else {
          figma.notify("Something went wrong", {
            error: true,
          });
          return;
        }
      }
    });
  }
  const getVariableByName = (name: string) => {
    return variables.find((variable) => variable.name === name);
  };

  type DynamicColorProps = {
    color: RGB;
    boundVariables: SolidPaint["boundVariables"];
  };

  const dynamicColor = ({
    raw,
    colorName,
  }: {
    raw: RawColor;
    colorName: string;
  }): DynamicColorProps => {
    const color = hslToRgbFloat(raw.h, raw.s, raw.l);
    if (isPaidFeature) {
      const variable = getVariableByName(colorName);
      return {
        color,
        boundVariables: {
          color: {
            id: variable.id,
            type: "VARIABLE_ALIAS",
          },
        },
      };
    } else {
      return {
        color,
        boundVariables: undefined,
      };
    }
  };

  if (collectionId) {
    const variableIds =
      figma.variables.getVariableCollectionById(collectionId).variableIds;
    const localVariables = figma.variables.getLocalVariables();
    variables = localVariables.filter((variable) =>
      variableIds.includes(variable.id),
    );
    // check if variables are created
    if (variables.length === 0) {
      figma.notify("Something went wrong, unable to retrieve variables", {
        error: true,
      });
      return;
    } else if (typeof variables[0] !== "object") {
      figma.notify("Something went wrong, variables are not an object", {
        error: true,
      });
      return;
    }
  }

  // ------------------ CREATE PALETTE ------------------
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
        - create brand color frame
          - set group layout to autolayout flex horizontal
          - name the frame "Brand"
        - layout
          - primary, primary-foreground
          - secondary, secondary-foreground
          - accent, accent-foreground
          - muted, muted-foreground
          - background, foreground
          - card, card-foreground
          - popover, popover-foreground
          - border, input, ring
    - create a text node
    - set to "Generated by Fluid Color"
    - zoom to fit
  */
  //* ------------------ CONSTANTS ------------------
  const CENTER_OFFSET = figma.viewport.center;
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
  type FrameOptions = {
    layoutMode: "HORIZONTAL" | "VERTICAL" | "NONE";
  };

  //* ------------------ HELPER FUNCTIONS ------------------
  const createFrame = (
    name: string,
    { layoutMode }: FrameOptions = {
      layoutMode: "HORIZONTAL",
    },
  ) => {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = layoutMode;
    f.counterAxisSizingMode = "AUTO";
    f.itemSpacing = 4;
    f.primaryAxisSizingMode = "AUTO";
    f.primaryAxisAlignItems = "CENTER";
    f.verticalPadding = 0;
    f.fills = [];
    return f;
  };

  const createBasePaletteFrame = ({
    paletteName: name,
    colorRect: { name: rectName, color: rectColor, boundVariables },
    paletteText: { title, color: colorText },
  }) => {
    const paletteFrame = figma.createFrame();
    paletteFrame.name = name;
    paletteFrame.layoutMode = "VERTICAL";
    paletteFrame.counterAxisSizingMode = "AUTO";
    paletteFrame.primaryAxisSizingMode = "AUTO";
    paletteFrame.primaryAxisAlignItems = "CENTER";
    paletteFrame.itemSpacing = 2;
    paletteFrame.verticalPadding = 0;
    paletteFrame.fills = [];

    //* create a rectangle
    const rect = createBaseColorRect({
      color: rectColor,
      boundVariables,
      name: rectName,
    });
    //* create a color name text node
    const textNameString = createPaletteNameText(title);
    //* create color text node
    const textColorStringFills = dynamicColor({
      raw: brandPalette["muted-foreground"].raw,
      colorName: "color/brand/muted-foreground",
    });

    const textColorString = createPaletteColorText(
      colorText,
      textColorStringFills,
    );

    paletteFrame.appendChild(rect);
    paletteFrame.appendChild(textNameString);
    paletteFrame.appendChild(textColorString);
    return paletteFrame;
  };

  const createBaseColorRect = ({
    color,
    boundVariables,
    name,
    width = BOX_WIDTH,
    height = BOX_HEIGHT,
  }: {
    color: { r: number; g: number; b: number };
    boundVariables?: SolidPaint["boundVariables"];
    name: string;
    width?: number;
    height?: number;
  }) => {
    const rect = figma.createRectangle();
    rect.name = name;
    rect.cornerRadius = 7;
    rect.resize(width, height);
    rect.fills = [
      {
        type: "SOLID",
        color: color,
        boundVariables: boundVariables ? boundVariables : undefined,
      },
    ];
    //* set the border -> 1px use brandPalette.border
    rect.strokes = [
      {
        type: "SOLID",
        ...dynamicColor({
          raw: brandPalette["border"].raw,
          colorName: "color/brand/border",
        }),
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
        ...dynamicColor({
          raw: brandPalette.foreground.raw,
          colorName: "color/brand/foreground",
        }),
        opacity: 0.85,
      },
    ];
    return textNameString;
  };

  const createPaletteColorText = (name, color: DynamicColorProps) => {
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
        ...color,
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
  // ------------------ BASE PALETTE ------------------
  let baseColorFrame;
  // if confirmedPalettes are empty, skip
  const SKIP_BASE_PALETTE =
    !confirmedPalettes.primary &&
    !confirmedPalettes.secondary &&
    !confirmedPalettes.accent &&
    !confirmedPalettes.gray;
  if (!SKIP_BASE_PALETTE) {
    baseColorFrame = figma.createFrame();
    baseColorFrame.x = CENTER_OFFSET.x;
    baseColorFrame.y = CENTER_OFFSET.y;
    baseColorFrame.cornerRadius = 28;
    baseColorFrame.name = collectionName;
    baseColorFrame.layoutMode = "VERTICAL";
    baseColorFrame.counterAxisSizingMode = "AUTO";
    baseColorFrame.layoutSizingHorizontal = "HUG";
    baseColorFrame.layoutSizingVertical = "HUG";
    baseColorFrame.itemSpacing = 8;
    baseColorFrame.horizontalPadding = PADDING * 4;
    baseColorFrame.paddingTop = PADDING * 2;
    baseColorFrame.paddingBottom = PADDING * 4;
    baseColorFrame.fills = [
      {
        type: "SOLID",
        ...dynamicColor({
          raw: brandPalette.background.raw,
          colorName: "color/brand/background",
        }),
      },
    ];

    //* create a text node
    const title = figma.createText();
    title.characters = collectionName;
    title.fontSize = 56;
    title.fontName = {
      family: "Inter",
      style: "Semi Bold",
    };
    title.fills = [
      {
        type: "SOLID",
        ...dynamicColor({
          raw: brandPalette.foreground.raw,
          colorName: "color/brand/foreground",
        }),
        opacity: 0.75,
      },
    ];
    title.lineHeight = {
      unit: "PERCENT",
      value: 160,
    };
    baseColorFrame.appendChild(title);
    //* for each base color
    Object.keys(BASE_PALETTES_TO_GENERATE).forEach((baseColor) => {
      const baseColorPalette = colorPalettes[baseColor];
      //* create a baseColor frame
      const colorFrame = createFrame(baseColor);
      colorFrame.layoutSizingHorizontal = "HUG";
      //* for each step
      baseColorPalette.forEach(({ step, color, raw }) => {
        const paletteFrame = createBasePaletteFrame({
          paletteName: `${baseColor}-${step}`,
          colorRect: {
            name: `${baseColor}-${step}-rect`,
            ...dynamicColor({
              raw,
              colorName: `color/${baseColor}/${step}`,
            }),
          },
          paletteText: {
            title: step.toString(),
            color: color,
          },
        });
        // insert into baseColorFrame
        colorFrame.appendChild(paletteFrame);
      });
      // insert into frame
      baseColorFrame.appendChild(colorFrame);
    });

    //* append to current page
    figma.currentPage.appendChild(baseColorFrame);
  }
  // ------------------ BRAND PALETTE ------------------

  await new Promise((resolve) => setTimeout(resolve, 300));
  //* if brand color palette is selected
  if (confirmedPalettes.brand) {
    // * Constants
    const BRAND_FRAME_WIDTH = 480;
    const BRAND_BOX_HEIGHT = 64;

    const brandColorFrame = figma.createFrame();
    brandColorFrame.name = "Brand Colors";
    brandColorFrame.x = -BRAND_FRAME_WIDTH - PADDING * 4 * 3 + CENTER_OFFSET.x;
    brandColorFrame.y = CENTER_OFFSET.y;
    brandColorFrame.cornerRadius = 28;
    brandColorFrame.layoutMode = "VERTICAL";
    brandColorFrame.counterAxisSizingMode = "AUTO";
    brandColorFrame.layoutSizingHorizontal = "HUG";
    brandColorFrame.layoutSizingVertical = "HUG";
    brandColorFrame.itemSpacing = 4;
    brandColorFrame.horizontalPadding = PADDING * 4;
    brandColorFrame.paddingTop = PADDING * 2;
    brandColorFrame.paddingBottom = PADDING * 4;
    brandColorFrame.fills = [
      {
        type: "SOLID",
        ...dynamicColor({
          raw: brandPalette.background.raw,
          colorName: "color/brand/background",
        }),
      },
    ];

    // * create a text node
    const brandTitle = figma.createText();
    brandTitle.characters = "Brand Colors";
    brandTitle.fontSize = 56;
    brandTitle.fontName = {
      family: "Inter",
      style: "Semi Bold",
    };
    brandTitle.fills = [
      {
        type: "SOLID",
        ...dynamicColor({
          raw: brandPalette.foreground.raw,
          colorName: "color/brand/foreground",
        }),
        opacity: 0.75,
      },
    ];

    brandTitle.lineHeight = {
      unit: "PERCENT",
      value: 160,
    };

    brandColorFrame.appendChild(brandTitle);

    const layout = [
      ["primary", "primary-foreground"],
      ["secondary", "secondary-foreground"],
      ["accent", "accent-foreground"],
      ["muted", "muted-foreground"],
      ["background", "card", "popover"],
      ["foreground", "card-foreground", "popover-foreground"],
      ["border", "input", "ring"],
    ];
    const textColorlayout = [
      ["primary-foreground", "primary"],
      ["secondary-foreground", "secondary"],
      ["accent-foreground", "accent"],
      ["muted-foreground", "muted"],
      ["foreground", "card-foreground", "popover-foreground"],
      ["background", "card", "popover"],
      ["foreground", "foreground", "background"],
    ];

    // * create a frame
    const brandColorPaletteFrame = createFrame("Brand Primary", {
      layoutMode: "VERTICAL",
    });
    layout.forEach((row, i) => {
      const rowFrame = createFrame(`row-${i + 1}`, {
        layoutMode: "HORIZONTAL",
      });
      row.forEach((color, j) => {
        const colorPalette = createBaseColorRect({
          ...dynamicColor({
            raw: brandPalette[color].raw,
            colorName: `color/brand/${color}`,
          }),
          name: color,
          width: BRAND_FRAME_WIDTH / row.length,
          height: BRAND_BOX_HEIGHT,
        });
        const textColor = textColorlayout[i][j];
        const textFills = dynamicColor({
          raw: brandPalette[textColor].raw,
          colorName: `color/brand/${textColor}`,
        });
        const colorPaletteText = createPaletteColorText(color, textFills);
        colorPaletteText.x = 8;
        colorPaletteText.y = 8;
        const colorPaletteGroup = figma.group(
          [colorPalette, colorPaletteText],
          rowFrame,
        );
        rowFrame.appendChild(colorPaletteGroup);
      });
      brandColorPaletteFrame.appendChild(rowFrame);
    });

    brandColorFrame.appendChild(brandColorPaletteFrame);
    figma.currentPage.appendChild(brandColorFrame);

    await new Promise((resolve) => setTimeout(resolve, 300));
    if (baseColorFrame) {
      figma.viewport.scrollAndZoomIntoView([baseColorFrame, brandColorFrame]);
    } else {
      figma.viewport.scrollAndZoomIntoView([brandColorFrame]);
    }
  } else {
    figma.viewport.scrollAndZoomIntoView(
      baseColorFrame ? [baseColorFrame] : [],
    );
  }

  figma.ui.postMessage({ type: PluginStatus.COMPLETED });
};
