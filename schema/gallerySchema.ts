import { ACCEPTED_IMAGE_TYPES } from "@/utils/constant";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB

const MAX_IMAGES = 10; // Maximum number of images allowed

// Base validation rules for common fields
const baseGalleryEventFields = {
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),

  driveLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
};

// Reusable image validation rules
const createImagesValidation = (isRequired: boolean) => {
  const baseValidation = z
    .custom<FileList>()
    .refine(
      (files) => !files || files.length === 0 || files.length <= MAX_IMAGES,
      `You can upload maximum ${MAX_IMAGES} images`
    )
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    }, `Max file size is 5MB`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "Only .jpg, .jpeg, .png and .webp formats are supported");

  return isRequired
    ? baseValidation.refine(
        (files) => files && files.length > 0,
        "At least one image is required"
      )
    : baseValidation.optional();
};

// Schema for creating a new gallery event
export const createGalleryEventSchema = z.object({
  ...baseGalleryEventFields,
  images: createImagesValidation(true),
});

// Schema for editing a gallery event
export const editGalleryEventSchema = z.object({
  ...baseGalleryEventFields,
  images: createImagesValidation(false),
});

// Type definitions
// export type BaseGalleryEventFormValues = z.infer<typeof baseGalleryEventFields>;
export type CreateGalleryEventFormValues = z.infer<
  typeof createGalleryEventSchema
>;
export type EditGalleryEventFormValues = z.infer<typeof editGalleryEventSchema>;

// Helper function to create default values
// export const createGalleryEventDefaultValues = (
//   editData?: Partial<CreateGalleryEventFormValues>
// ): Partial<CreateGalleryEventFormValues> => ({
//   title: editData?.title || "",
//   description: editData?.description || "",
//   driveLink: editData?.driveLink || "",
// });
