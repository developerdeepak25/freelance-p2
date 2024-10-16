import mongoose from "mongoose";


export interface IGallery {
  title: string;
  description: string;
  images: string[];
  cloudinaryImagesId: string[];
  driveLink: string;
}

const gallerySchema = new mongoose.Schema<IGallery>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    images: {
      type: [String], // Array of URLs (likely from Cloudinary)
      required: true,
    },
    cloudinaryImagesId: {
      type: [String],
      required: true,
    },
    driveLink: {
      type: String, // Google Drive link for additional photos
    //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", gallerySchema);
export default Gallery;