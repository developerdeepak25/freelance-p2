// ? This enpoint is not actually used but can be used to have good consistency in backend and frontend

import dbConnect from "@/lib/dbConnect";
import { CAST, COMMITTEES, DESIGNATIONS } from "@/models/Member";
import {  NextResponse } from "next/server";

/**
 * Get configuration options
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json(
      {
        designations: DESIGNATIONS,
        castes: CAST,
        committees: COMMITTEES,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving options." },
      { status: 500 }
    );
  }
}
