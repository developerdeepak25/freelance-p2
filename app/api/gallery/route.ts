import Gallery, { IGallery } from "@/models/Gallery";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/utils/cloudnaryUtils";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const driveLink = formData.get("driveLink") as string;
    const imageFiles = formData.getAll("images") as File[];

    // Validate required fields
    if (!title || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "Please provide title and images." },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const uploadResults = await uploadToCloudinary(imageFiles);

    // Check if uploadResults is an array
    const resultsArray = Array.isArray(uploadResults)
      ? uploadResults
      : [uploadResults];
    // const imageUrls = resultsArray.map((result) => result.secure_url);
    // const cloudinaryImageIds = resultsArray.map((result) => result.public_id);

    // Create new gallery
    const galleryData: IGallery = {
      title,
      description,
      // images: imageUrls,
      // cloudinaryImagesId: cloudinaryImageIds,
      imageDetails: resultsArray.map((result) => ({
        imageUrl: result.secure_url,
        imageId: result.public_id,
      })),
      driveLink,
    };

    const gallery = new Gallery(galleryData);

    // Save gallery
    await gallery.save();

    // Return created gallery
    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the gallery." },
      { status: 500 }
    );
  }
}
