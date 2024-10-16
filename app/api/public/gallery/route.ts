import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const galleries = await Gallery.find().sort({ createdAt: -1 });

    return NextResponse.json(galleries);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching galleries." },
      { status: 500 }
    );
  }
}
