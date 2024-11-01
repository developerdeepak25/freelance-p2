import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/utils/cloudnaryUtils";
import { isErrorWithMessage } from "@/utils/other";
import { NextRequest, NextResponse } from "next/server";

// DELETE endpoint to delete a gallery by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const galleryId = params.id;

    // Validate gallery ID
    if (!galleryId) {
      return NextResponse.json(
        { error: "Gallery ID is required." },
        { status: 400 }
      );
    }

    // Find gallery by ID
    const gallery = await Gallery.findByIdAndDelete(galleryId);

    // Validate gallery existence
    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found." },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    // const deleteResults = await deleteFromCloudinary(

    const imageIds = gallery.imageDetails.map(
      (imageDetail: { imageId: string; imageUrl: string }) =>
        imageDetail.imageId
    );
    // console.log("🚀 ~ imageIds:", imageIds);

    // await deleteFromCloudinary(gallery.cloudinaryImagesId);
    await deleteFromCloudinary(imageIds);

    return NextResponse.json(
      { message: "Gallery deleted successfully." },
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

// Update Gallery

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const galleryId = params.id;
    // console.log("galleryId", galleryId);

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const driveLink = formData.get("driveLink") as string;
    const imageFiles = formData.getAll("images") as File[];
    console.log(title, description, driveLink, imageFiles);
    

    // console.log(imageFiles);

    const gallery = await Gallery.findById(galleryId);
    // Update gallery fields
    gallery.title = title || gallery.title;
    gallery.description = description || gallery.description;
    // gallery.driveLink = driveLink || gallery.driveLink;
    gallery.driveLink =  driveLink;

    // Add or replace images (if provided)
    if (imageFiles && imageFiles.length > 0) {
      // Upload new images to Cloudinary

      // const uploadResults = await uploadToCloudinary(imageFiles);
       let uploadResults;

       try {
         uploadResults = await uploadToCloudinary(imageFiles);
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

      const resultsArray = Array.isArray(uploadResults)
        ? uploadResults
        : [uploadResults];
      // const imageUrls = resultsArray.map((result) => result.secure_url);
      // const cloudinaryImageIds = resultsArray.map((result) => result.public_id);

      // gallery.images.push(...imageUrls);
      // gallery.cloudinaryImagesId.push(...cloudinaryImageIds);

      gallery.imageDetails = (gallery.imageDetails || []).concat(
        resultsArray.map((result) => ({
          imageId: result.public_id,
          imageUrl: result.secure_url,
        }))
      );
    }

    await gallery.save();

    return NextResponse.json(
      { message: "Gallery updated successfully.", gallery },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while updating the gallery." },
      { status: 500 }
    );
  }
}
