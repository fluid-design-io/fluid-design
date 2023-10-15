import { NextResponse } from "next/server";
import tinycolor from "tinycolor2";
import jwt from "jsonwebtoken";
import { BaseColors, RawColor } from "@/types/app";

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

export async function POST(request: Request) {
  const { baseColors } = await request.json();
  const authSecret = process.env.FIGMA_AUTH_SECRET;
  // generate a bearer token using jwt.io
  const token = jwt.sign(
    {
      // this is the data we want to encode
      // we can encode anything, but we want to encode the base colors
      // so we can use it in the figma plugin
      ...baseColors,
    },
    authSecret,
    {
      // this is the secret key
      // we can use the same secret key in the figma plugin to decode the token
      // and get the base colors
      expiresIn: "7d",
    },
  );

  const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return new Response(`${url}/api/figma-plugin?token=${token}`);
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
  console.log(`====> Base Colors:`, baseColors);
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
  const v = (color: string | RawColor) => tinycolor(color).isValid();
  if (!v(primary) || !v(secondary) || !v(accent)) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Invalid primary, secondary or accent color",
        },
      },
      {
        status: 400,
        headers: headers(origin),
      },
    );
  }
  return NextResponse.json(
    {
      data: { primary, secondary, accent },
      error: null,
    },
    {
      headers: headers(origin),
    },
  );
}
