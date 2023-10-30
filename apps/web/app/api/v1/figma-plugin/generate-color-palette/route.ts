import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { BaseColorTypes, BaseColors, ColorMode, RawColor } from "@/types/app";
import { generateColorPalette } from "@/lib/colorCalculator";

const headers = (origin: string) => ({
  "Access-Control-Allow-Origin": origin || "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
});

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");

  return new Response(null, {
    status: 200,
    headers: headers(origin),
  });
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const authSecret = process.env.FIGMA_AUTH_SECRET;
  // decode the token using the same secret key
  // we should get the base colors
  let baseColors: Partial<BaseColors>;
  try {
    baseColors = jwt.verify(token, authSecret);
  } catch (error) {
    console.log(`====> Error:`, error);
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Invalid token",
        },
      },
      {
        status: 400,
        headers: headers(origin),
      },
    );
  }
  const { primary, secondary, accent } = baseColors as BaseColors;
  if (!primary || !secondary || !accent) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Missing primary, secondary or accent color",
        },
      },
      {
        status: 400,
        headers: headers(origin),
      },
    );
  }
  // !TODO: get mode from query params
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
  console.log(`SUCCCESSFULLY GENERATED PALETTES`);
  return NextResponse.json(
    {
      error: null,
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
    },
    {
      headers: headers(origin),
    },
  );
}
