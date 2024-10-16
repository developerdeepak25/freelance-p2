// utils/cloudinaryUpload.ts

import cloudinary from "@/lib/cloudnary";
export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  // Add other properties as needed
};
export type CloudinaryDeleteResult = {
  result: string;
  // Add other properties as needed
};


export async function uploadToCloudinary(
  files: File | File[]
): Promise<CloudinaryUploadResult | CloudinaryUploadResult[]> {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    throw new Error("No files provided");
  }

  const uploadSingle = async (file: File): Promise<CloudinaryUploadResult> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "MEVSImages-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );

      uploadStream.end(buffer);
    });
  };

  if (Array.isArray(files)) {
    return Promise.all(files.map(uploadSingle));
  } else {
    return uploadSingle(files);
  }
}





export async function deleteFromCloudinary(
  publicIds: string | string[]
): Promise<CloudinaryDeleteResult | CloudinaryDeleteResult[]> {
  if (!publicIds || (Array.isArray(publicIds) && publicIds.length === 0)) {
    throw new Error("No public IDs provided");
  }

  const deleteSingle = async (
    publicId: string
  ): Promise<CloudinaryDeleteResult> => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryDeleteResult);
      });
    });
  };

  if (Array.isArray(publicIds)) {
    return Promise.all(publicIds.map(deleteSingle));
  } else {
    return deleteSingle(publicIds);
  }
}