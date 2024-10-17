import { generateAccessToken, generateRefreshToken } from "@/utils/auth";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_USERID = process.env.ADMIN_USERID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: "none",
  // sameSite: "strict",
  // path: "/",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// route for login

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, password } = body;
  console.log("userid", userId, password);

  // did this becuse there will be only one use which can login and he being a member is not neceserry
  try {
    if (userId !== ADMIN_USERID || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    const accessToken = await generateAccessToken({ userId });
    const refreshToken = await generateRefreshToken({ userId });
    console.log("🚀 ~ POST ~ refreshToken:", refreshToken);

    cookies().set("refreshToken", refreshToken, cookieOptions);
    cookies().set("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 5 * 60 * 1000,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        success: true,
        accessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
