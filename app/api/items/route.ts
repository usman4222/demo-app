import { NextResponse } from "next/server";

const BASE_URL = "https://pharma-backend-zeta.vercel.app/api/users";

export async function GET() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await res.json();

    // Make sure we return in the same format as before
    return NextResponse.json({ users: data.users || [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}
