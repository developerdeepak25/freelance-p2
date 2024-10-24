import { NextRequest, NextResponse } from "next/server";
import Member from "@/models/Member";
import dbConnect from "@/lib/dbConnect";

export const revalidate = 10;

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const committee = searchParams.get("committee")?.toUpperCase();

    // Validate committee query parameter
    const validCommittees = ["GENERAL", "EXECUTIVE"];
    const isInvalidCommittee =
      committee && !validCommittees.includes(committee);

    if (isInvalidCommittee) {
      return NextResponse.json({ error: "Invalid committee" }, { status: 400 });
    }

    // Query members with field selection
    const query = committee ? { committee } : {};
    const members = await Member.find(query)
      .select("name photo email designation profession committee socialLinks ")
      .populate("socialLinks", "platform url "); // Assuming socialLinks have platform and url fields

    // Return public members data
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
