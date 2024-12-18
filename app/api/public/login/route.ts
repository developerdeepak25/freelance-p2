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
  // maxAge: 60, // ! tempereraly set to 10s
}
// route for login

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, password } = body;

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

    cookies().set("refreshToken", refreshToken, cookieOptions);
    cookies().set("accessToken", accessToken, {
      ...cookieOptions,
      // maxAge: 10 , // tempereraly set to 10s
      maxAge: 15 * 60 , //set to 15min
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
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
