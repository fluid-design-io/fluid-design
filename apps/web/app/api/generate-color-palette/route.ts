import { generateColorPalette } from "@/lib/colorCalculator";
import { colorHelper } from "@/lib/colorHelper";
import { BaseColorTypes, ColorMode } from "@/types/app";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const { searchParams } = new URL(req.url);
  const colorsString = searchParams.get("colors");
  if (!colorsString) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Invalid token",
        },
      },
      {
        status: 400,
      },
    );
  }
  const baseColors = colorHelper.colorStringToBaseColors(colorsString);
  const mode = ColorMode.HEX;
  const [primaryPalette, secondaryPalette, accentPalette, grayPalette] = [
    "primary",
    "secondary",
    "accent",
    "gray",
  ].map((color) =>
    generateColorPalette({
      color: color === "gray" ? baseColors.primary : baseColors[color],
      type: color as BaseColorTypes,
      colorMode: mode,
    }),
  );
  return NextResponse.json(
    {
      data: {
        baseColors,
        colorPalettes: {
          primary: primaryPalette,
          secondary: secondaryPalette,
          accent: accentPalette,
          gray: grayPalette,
        },
        colorMode: mode,
      },
      error: null,
    },
    {
      status: 200,
    },
  );
}
