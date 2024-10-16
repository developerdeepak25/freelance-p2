// import Gallery from "@/models/Gallery";
// import { deleteFromCloudinary } from "@/utils/cloudnaryUtils";
// import { NextRequest, NextResponse } from "next/server";

// // Delete Gallery Images


// //  takes gallery id not image id as parameter
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json();
//     const { imageIds } = body;
//     const gallery = await Gallery.findById(params.id);

//     // Delete images from Cloudinary
//     await deleteFromCloudinary(imageIds);

//     // Remove deleted images from gallery
//     gallery.images = gallery.images.filter(
//       (url: string) => !imageIds.includes(url)
//     );
//     gallery.cloudinaryImagesId = gallery.cloudinaryImagesId.filter(
//       (id: string) => !imageIds.includes(id)
//     );

//     await gallery.save();
//     console.log('few things will happen here');
    
//     return NextResponse.json(
//       {
//         message: `Images deleted successfully for ${gallery.title.substring(
//           0,
//           2
//         )}.`,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "An error occurred while deleting the gallery." },
//       { status: 500 }
//     );
//   }
// }


import Gallery from "@/models/Gallery";
import { deleteFromCloudinary } from "@/utils/cloudnaryUtils";
import { NextRequest, NextResponse } from "next/server";

// Delete Gallery Images

// Takes gallery id, not image id, as a parameter
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { imageIds } = body; // Array of Cloudinary image IDs to delete
    const gallery = await Gallery.findById(params.id);

    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found." },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    await deleteFromCloudinary(imageIds);

    // Filter out the images that match the provided imageIds and update the gallery
    gallery.imageDetails = gallery.imageDetails.filter(
      (imageDetail: { imageId: string; imageUrl: string }) =>
        !imageIds.includes(imageDetail.imageId)
    );

    // Save the updated gallery
    await gallery.save();

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
      {
        error: "An error occurred while deleting the images from the gallery.",
      },
      { status: 500 }
    );
  }
}

