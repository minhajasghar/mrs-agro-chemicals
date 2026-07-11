import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    if (!ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { error: "Server configuration error: admin credentials not set." },
        { status: 500 }
      );
    }

    console.log("Login attempt - Input username:", username, "Expected username:", ADMIN_USERNAME);
    if (username !== ADMIN_USERNAME) {
      console.log("Username mismatch!");
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    console.log("Bcrypt comparison checking...");
    const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log("Bcrypt validation result:", valid);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
