import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get events
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
     const searchParams = req.nextUrl.searchParams;
     const eventQueryParam = searchParams.get("event")
     console.log("🚀 ~ GET ~ eventQueryParam:", eventQueryParam)

    // const url = new URL(req.url);
    // const eventQueryParam = url.searchParams.get("event");

    const query: any = {};

    // Filter events by query parameter
    if (eventQueryParam === "past") {
      query.$and = [
        { startDate: { $lt: new Date() } },
        { endDate: { $lt: new Date() } },
      ];
    } else if (eventQueryParam === "upcoming") {
      query.$or = [
        { startDate: { $gt: new Date() } },
        {
          $and: [
            { startDate: { $lte: new Date() } },
            { endDate: { $gte: new Date() } },
          ],
        },
      ];
    }

    // Retrieve events
    const events = await Event.find(query)
      .sort({ startDate: 1 })
      .populate("cloudinaryThumbnailId");

    // Return events
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving events." },
      { status: 500 }
    );
  }
}



