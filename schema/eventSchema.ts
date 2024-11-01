import { ACCEPTED_IMAGE_TYPES } from "@/utils/constant";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB

// Base validation rules for common fields
const baseEventFields = {
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),

  dateRange: z.object({
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z.date({
      required_error: "End date is required",
    }),
  }),

  venue: z.string().optional(),

  highlights: z.string().url("Invalid URL").optional().or(z.literal("")),
};

// Reusable image validation rules
const createImageValidation = (isRequired: boolean) => {
  const baseValidation = z
    .custom<FileList>()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      "Only one image can be uploaded"
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB`
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    );

  return isRequired
    ? baseValidation.refine((files) => files && files.length === 1, "Image is required")
    : baseValidation.optional();
};

// Schema for creating a new event
export const createEventSchema = z.object({
  ...baseEventFields,
  thumbnail: createImageValidation(true),
});

// Schema for editing an event
export const editEventSchema = z.object({
  ...baseEventFields,
  thumbnail: createImageValidation(false),
});

// Type definitions
// export type BaseEventFormValues = z.infer<typeof baseEventFields>;
export type CreateEventFormValues = z.infer<typeof createEventSchema>;
export type EditEventFormValues = z.infer<typeof editEventSchema>;

// Helper function to create default values for the form
// export const createEventDefaultValues = (
//   editData?: Partial<CreateEventFormValues>
// ): Partial<CreateEventFormValues> => ({
//   title: editData?.title || "",
//   description: editData?.description || "",
//   venue: editData?.venue || "",
//   highlights: editData?.highlights || "",
//   dateRange: editData?.dateRange || undefined,
// });
