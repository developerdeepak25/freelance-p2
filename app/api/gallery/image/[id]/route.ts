import Gallery from "@/models/Gallery";
import { deleteFromCloudinary } from "@/utils/cloudnaryUtils";
import { NextRequest, NextResponse } from "next/server";

// Delete Gallery Images


//  takes gallery id not image id as parameter
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { imageIds } = body;
    const gallery = await Gallery.findById(params.id);

    // Delete images from Cloudinary
    await deleteFromCloudinary(imageIds);

    // Remove deleted images from gallery
    gallery.images = gallery.images.filter(
      (url: string) => !imageIds.includes(url)
    );
    gallery.cloudinaryImagesId = gallery.cloudinaryImagesId.filter(
      (id: string) => !imageIds.includes(id)
    );

    await gallery.save();
    console.log('few things will happen here');
    
    return NextResponse.json(
      {
        message: `Images deleted successfully for ${gallery.title.substring(
          0,
          2
        )}.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the gallery." },
      { status: 500 }
    );
  }
}
