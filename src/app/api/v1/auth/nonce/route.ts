import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { address } = (await request.json()) as { address?: string };

    if (!address || typeof address !== "string") {
      return NextResponse.json({ message: "Address is required" }, { status: 400 });
    }

    const nonce = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    return NextResponse.json({ nonce, expiresAt });
  } catch (error) {
    console.error("[auth/nonce] error:", error);
    return NextResponse.json({ message: "Failed to issue login nonce" }, { status: 500 });
  }
}
