import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { mode } = await req.json();
  cookies().set("colorMode", mode);
  console.log(`updated server cookie to ${mode}`);
  return new Response(null, { status: 200 });
}
