import { NextResponse } from "next/server";
import type { LoginResponse } from "@/types/models";

type LoginRequest = {
  address?: string;
  signature?: string;
  nonce?: string;
  chainId?: number;
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequest;
    const { address, signature, nonce, chainId } = body;

    if (!address || !signature || !nonce || typeof chainId !== "number") {
      return NextResponse.json({ message: "Invalid login payload" }, { status: 400 });
    }

    const mockResponse: LoginResponse = {
      accessToken: `mock-token-${nonce}`,
      user: {
        id: `user-${address.toLowerCase()}`,
        address,
        roles: ["user"],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("[auth/login] error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
