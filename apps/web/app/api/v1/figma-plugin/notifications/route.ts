import { NextResponse } from "next/server";

const headers = (origin: string) => ({
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Origin": origin || "*",
});

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");

  return new Response(null, {
    headers: headers(origin),
    status: 200,
  });
}

type NotificationType = "error" | "info" | "none";
type Notification = {
  href?: string;
  message: string;
  type: NotificationType;
};

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  return NextResponse.json(
    {
      data: [
        // {
        //   message:
        //     "We're currently fixing the issue related to the Figma plugin.",
        //   href: "",
        //   type: "error" as NotificationType,
        // },
        // {
        //   message: undefined,
        //   type: "none" as NotificationType,
        // },
      ],
      error: null,
    },
    {
      headers: headers(origin),
    },
  );
}
