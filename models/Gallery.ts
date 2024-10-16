// import mongoose from "mongoose";


// export interface IGallery {
//   title: string;
//   description: string;
//   images: string[];
//   cloudinaryImagesId: string[];
//   driveLink: string;
// }

// const gallerySchema = new mongoose.Schema<IGallery>(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     //   required: true,
//     },
//     images: {
//       type: [String], // Array of URLs (likely from Cloudinary)
//       required: true,
//     },
//     cloudinaryImagesId: {
//       type: [String],
//       required: true,
//     },
//     driveLink: {
//       type: String, // Google Drive link for additional photos
//     //   required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", gallerySchema);
// export default Gallery;



import mongoose from "mongoose";

export interface IGallery {
  title: string;
  description: string;
  imageDetails: {
    imageUrl: string;
    imageId: string;
  }[];
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
    imageDetails: [
      {
        imageUrl: {
          type: String, // URL for the image (from Cloudinary or elsewhere)
          required: true,
        },
        imageId: {
          type: String, // Corresponding Cloudinary image ID
          required: true,
        },
      },
    ],
    driveLink: {
      type: String, // Google Drive link for additional photos
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", gallerySchema);
export default Gallery;
