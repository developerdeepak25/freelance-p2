import dbConnect from "@/lib/dbConnect";
import Event, { IEvent } from "@/models/Event";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/utils/cloudnaryUtils";
import { isErrorWithMessage } from "@/utils/other";
import { NextRequest, NextResponse } from "next/server";

/**
 * Delete an event
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const eventId = params.id;

    // Validate event ID
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 400 }
      );
    }

    // Find event by ID
    const event = await Event.findByIdAndDelete(eventId);

    // Validate event existence
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    // Delete event thumbnail from Cloudinary
    const deleteResult = await deleteFromCloudinary(
      event.cloudinaryThumbnailId
    );

    // Delete event
    // await event.remove();

    // Return success response
    return NextResponse.json(
      { message: "Event deleted successfully.", deleteResult },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the event." },
      { status: 500 }
    );
  }
}

/**
 * Update an event
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const eventId = params.id;

    // Validate event ID
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 400 }
      );
    }

    // Find event by ID
    const event = await Event.findById(eventId);

    // Validate event existence
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const formData = await req.formData();
    const eventData: Partial<IEvent> = {};
    let thumbnailFile: File | null = null;

    // Process form data
    formData.forEach((value, key) => {
      if (key === "thumbnail" && value instanceof File) {
        thumbnailFile = value;
      } else if (typeof value === "string") {
        console.log("key", key, "value", value);
        eventData[key as keyof IEvent] = value;
      }
    });
    console.log(eventData);
    

    // Update event
    if (thumbnailFile) {
      // Upload new thumbnail to Cloudinary
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

      // Delete existing thumbnail from Cloudinary
      await deleteFromCloudinary(event.cloudinaryThumbnailId);

      const thumbnail = Array.isArray(uploadResult)
        ? uploadResult[0]
        : uploadResult;

      // Update event thumbnail
      event.thumbnail = thumbnail.secure_url;
      event.cloudinaryThumbnailId = thumbnail.public_id;
    }

    // Update event fields
    event.title = eventData.title || event.title;
    event.description = eventData.description || event.description;
    event.startDate = eventData.startDate
      ? new Date(eventData.startDate)
      : event.startDate;
    event.endDate = eventData.endDate
      ? new Date(eventData.endDate)
      : event.endDate;
    // event.venue = eventData.venue || event.venue;
    event.venue =  eventData.venue ;
    event.eventGalleryLink =
      eventData.eventGalleryLink || event.eventGalleryLink;
    // event.highlights = eventData.highlights || event.highlights;
    event.highlights = eventData.highlights ;

    // Save updated event
    await event.save();

    // Return updated event
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while updating the event." },
      { status: 500 }
    );
  }
}
