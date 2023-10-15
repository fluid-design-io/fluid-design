import { BaseColors } from "@/types/app";

async function generateFigmaUrlToken(baseColors: Omit<BaseColors, "gray">) {
  const url = await fetch("/api/figma-plugin", {
    method: "POST",
    body: JSON.stringify({ baseColors }),
  }).then((res) => res.text());
  return url;
}

export default generateFigmaUrlToken;
