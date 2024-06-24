import { BaseColors } from "@/types/app";

import { colorHelper } from "../colorHelper";

async function generateFigmaUrlToken(baseColors: Omit<BaseColors, "gray">) {
  const { data, error } = await fetch("/api/v1/figma-plugin", {
    body: JSON.stringify({
      baseColors,
    }),
    method: "POST",
  }).then((res) => res.json());
  const hexColors = Object.values(baseColors).map((color) =>
    colorHelper.toHex(color),
  );
  return `${process.env.NEXT_PUBLIC_URL}/?token=${
    data.token
  }&colors=${encodeURIComponent(hexColors.join(","))}`;
}

export default generateFigmaUrlToken;
