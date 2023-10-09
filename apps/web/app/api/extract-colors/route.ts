import { extractColors } from "extract-colors";

export async function POST(req: Request) {
  const { image } = await req.json();
  const colors = await extractColors(image);
  console.log(colors);
  return Response.json({ colors });
}
