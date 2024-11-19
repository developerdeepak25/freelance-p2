import { NextRequest, NextResponse } from "next/server";
import Member from "@/models/Member";
import dbConnect from "@/lib/dbConnect";
import { isPastTimestamp } from "@/utils/other";

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
      .select(
        "name photo email designation profession committee socialLinks phoneNo isMemberShipLifeTime memberShipExpiresAt"
      )
      .populate("socialLinks", "platform url "); // Assuming socialLinks have platform and url fields

    // Filter out expired memberships
    const filteredMembers = members.filter((member) => {
      if (member.isMemberShipLifeTime) {
        return true; // Lifetime members are always included
      }
      return (
        member.memberShipExpiresAt &&
        !isPastTimestamp(member.memberShipExpiresAt)
      ); // Exclude expired memberships
    });

    // Return public members data
    return NextResponse.json(filteredMembers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
