export enum ColorMode {
  HEX = "hex",
  RGB = "rgb",
  HSL = "hsl",
}

export type RawColor = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export type BaseColorTypes = "primary" | "secondary" | "accent" | "gray";

export type BaseColors = Record<BaseColorTypes, RawColor>;

export type ColorValue =
  | {
      step: number;
      color: string;
      raw: RawColor;
    }
  | undefined;

export type ColorPalettes = Record<BaseColorTypes, ColorValue[]>;

export type AppCSSVariables =
  | "--background"
  | "--foreground"
  | "--card"
  | "--card-foreground"
  | "--popover"
  | "--popover-foreground"
  | "--primary"
  | "--primary-foreground"
  | "--secondary"
  | "--secondary-foreground"
  | "--muted"
  | "--muted-foreground"
  | "--accent"
  | "--accent-foreground"
  | "--border"
  | "--input"
  | "--ring"
  | "--background-accent";
