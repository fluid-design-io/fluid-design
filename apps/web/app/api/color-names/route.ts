import colorNameList from "../../../lib/converted_colors.json";
import { nearest, differenceEuclidean } from "culori";

export async function POST(req: Request) {
  const { colors } = await req.json();

  const colorKeys = Object.keys(colorNameList);

  const nearestNamedColors = nearest(
    colorKeys,
    differenceEuclidean(),
    (name) => colorNameList[name],
  );
  let names = colors.map((color) => {
    const name = nearestNamedColors(color, 1);
    return name?.[0];
  });
  return Response.json({ names });
}
