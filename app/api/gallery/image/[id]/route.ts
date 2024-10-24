import Gallery from "@/models/Gallery";
import { deleteFromCloudinary } from "@/utils/cloudnaryUtils";
import { NextRequest, NextResponse } from "next/server";

// Delete Gallery Images

// Takes gallery id, not image id, as a parameter
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { imageId } = body; // Single Cloudinary image ID to delete
    const gallery = await Gallery.findById(params.id);

    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found." },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary
    await deleteFromCloudinary(imageId);

    // Filter out the image that matches the provided imageId and update the gallery
    gallery.imageDetails = gallery.imageDetails.filter(
      (imageDetail: { imageId: string; imageUrl: string }) =>
        imageDetail.imageId !== imageId
    );

    // Save the updated gallery
    await gallery.save();

    return NextResponse.json(
      {
        message: `Image deleted successfully for ${gallery.title.substring(
          0,
          2
        )}.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An error occurred while deleting the image from the gallery.",
      },
      { status: 500 }
    );
  }
}


