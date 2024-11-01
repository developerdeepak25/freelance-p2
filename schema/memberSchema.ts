import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/constant";

const MAX_FILE_SIZE = 5000000; // 5MB

// Validation for social links
const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().min(1, "URL is required").url("Invalid URL"),
});

// Member form validation schema
export const memberSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z.string().email("Invalid email format").optional(),

  phoneNo: z
    .string()
    // .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .optional(),

  photo: z
    .custom<FileList>()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      "Only one image can be uploaded"
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional(),

  panCardNo: z
    .string()
    // .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Card format")
    .optional(),

  aadharCardNo: z
    .string()
    // .regex(/^[0-9]{12}$/, "Aadhar Card must be 12 digits")
    .optional(),

  dateOfBirth: z
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .optional(),

  caste: z.enum(["general", "obc", "SC", "ST", "others"]).optional(),

  designation: z
    .string()
    // .min(2, "Designation must be at least 2 characters")
    .max(100, "Designation must be less than 100 characters")
    .optional(),

  profession: z
    .string()
    .max(100, "Profession must be less than 100 characters")
    .optional(),

  committee: z.enum(["GENERAL", "EXECUTIVE"], {
    errorMap: () => ({ message: "Invalid committee selection" }),
  }),

  socialLinks: z
    .array(socialLinkSchema)
    .max(3, "Maximum 3 social links allowed")
    .optional(),
});

// Type inference for TypeScript
export type MemberFormValues = z.infer<typeof memberSchema>;

// Helper function to create default values
// export const createMemberDefaultValues = (
//   editData?: Partial<MemberFormValues>
// ): Partial<MemberFormValues> => ({
//   name: editData?.name || "",
//   email: editData?.email || "",
//   phoneNo: editData?.phoneNo || "",
//   designation: editData?.designation || "",
//   committee: editData?.committee || "GENERAL",
//   socialLinks: editData?.socialLinks || [],
// });
