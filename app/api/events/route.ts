import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/utils/cloudnaryUtils";
import { isErrorWithMessage } from "@/utils/other";
import { NextRequest, NextResponse } from "next/server";

interface EventData {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  eventGalleryLink?: string;
  highlights?: string;
}

/**
 * Create an event
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    console.log("formdata", formData);

    const eventData: Partial<EventData> = {};
    let thumbnailFile: File | null = null;

    // Process form data
    formData.forEach((value, key) => {
      if (key === "thumbnail" && value instanceof File) {
        thumbnailFile = value;
      } else if (typeof value === "string") {
        eventData[key as keyof EventData] = value;
      }
    });
    console.log("eventData", eventData);

    // Validate required fields
    const requiredFields: (keyof EventData)[] = [
      "title",
      "description",
      "startDate",
      // "endDate",
    ];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { error: `Please provide ${field}.` },
          { status: 400 }
        );
      }
    }

    if (!thumbnailFile) {
      console.log("thumbnailFile not provided");
      return NextResponse.json(
        { error: "Please provide a thumbnail image." },
        { status: 400 }
      );
    }

    // Upload thumbnail to Cloudinary
    // const uploadResult = await uploadToCloudinary(thumbnailFile);
    let uploadResult;

    try {
      uploadResult = await uploadToCloudinary(thumbnailFile);
    } catch (error) {
      console.error("Cloudinary upload error:", error);

      // TypeScript-safe error handling
      const errorMessage =
        typeof error === "string"
          ? error
          : isErrorWithMessage(error)
          ? error.message
          : "An unknown error occurred while uploading images.";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    let thumbnail: CloudinaryUploadResult;

    if (Array.isArray(uploadResult)) {
      if (uploadResult.length === 0) {
        throw new Error("Cloudinary upload failed");
      }
      thumbnail = uploadResult[0];
    } else {
      thumbnail = uploadResult;
    }
    console.log("thumbnail", thumbnail);

    // Create new event
    const event = new Event({
      ...eventData,
      thumbnail: thumbnail.secure_url,
      cloudinaryThumbnailId: thumbnail.public_id,
      startDate: new Date(eventData.startDate!),
      // endDate: new Date(eventData.endDate!),
      endDate: new Date(eventData.endDate ?? eventData.startDate!),
    });

    // Save event
    await event.save();
    console.log("🚀 ~ POST ~ event:", event);

    // Return created event
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the event." },
      { status: 500 }
    );
  }
}
