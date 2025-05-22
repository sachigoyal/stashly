import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { imagekit } from "@/lib/imagekit";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate the authentication for imagekit" },
      { status: 500 }
    );
  }
}
