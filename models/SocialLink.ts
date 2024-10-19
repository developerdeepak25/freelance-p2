import mongoose, { Schema, Document, Types } from "mongoose";

// Define the platform types
export const PLATFORMS = [
  "facebook",
  "twitter",
  //   "linkedin",
  "instagram",
  //   "youtube",
  //   "github",
  //   "other",
] as const;
// type Platform = typeof PLATFORMS;

// Interface for the social link document
export interface ISocialLink extends Document {
  platform: "facebook" | "twitter" | "instagram";
  url: string;
  member: Types.ObjectId;
}

// Define the schema for social links
const socialLinkSchema = new Schema<ISocialLink>(
  {
    platform: {
      type: String,
      required: true,
      enum: PLATFORMS,
    },
    url: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (v: string): boolean {
      //     // Basic URL validation regex
      //     return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
      //       v
      //     );
      //   },
      //   message: (props: { value: string }) =>
      //     `${props.value} is not a valid URL!`,
      // },
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for platform and url to ensure uniqueness
// socialLinkSchema.index({ platform: 1, url: 1 }, { unique: true });

// Export the schema
// export default socialLinkSchema;

// If you want to use this as a standalone model, uncomment the following lines:
const SocialLink =
  mongoose.models.SocialLink ||
  mongoose.model<ISocialLink>("SocialLink", socialLinkSchema);
export default SocialLink;
