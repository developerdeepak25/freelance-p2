import mongoose, { Document, Model, Schema, Types } from "mongoose";

export const DESIGNATIONS = [
  "Patron",
  "President",
  "Vice President",
  "Secretary",
  "Joint Secretary",
  "Treasures",
  "Co-Treasures",
  "Public relation officer",
  "Organization minister",
  "Member",
] as const;

// export const CAST = ["general", "obc", "SC", "ST", "MBC"] as const;
export const CAST = ["general", "OBC", "SC", "ST", "MBC"] as const;

export const COMMITTEES = ["EXECUTIVE", "GENERAL", "CORE"] as const;

type Designation = (typeof DESIGNATIONS)[number];
type Cast = (typeof CAST)[number];
type Committee = (typeof COMMITTEES)[number];

export interface IMember extends Document {
  name: string;
  email?: string;
  phoneNo?: string;
  photo: string;
  cloudinaryPhotoId: string;
  panCardNo?: string;
  aadharCardNo: string;
  janAadharCardNo?: string;
  dateOfBirth?: Date;
  caste?: Cast;
  designation: Designation | string;
  profession?: string;
  committee: Committee;
  socialLinks?: Types.ObjectId[];
  isMemberShipLifeTime: boolean;
  memberShipExpiresAt?: Date | null;
  // isMembershipValid: boolean;
}

const memberSchema = new Schema<IMember>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // unique: true,
      sparse: true,
    },
    phoneNo: {
      sparse: true,
      type: String,
      default: "",
    },
    photo: {
      sparse: true,
      type: String,
      default: "",
      // required: true,
    },
    cloudinaryPhotoId: {
      sparse: true,
      type: String,
      // required: true,
    },
    panCardNo: {
      type: String,
      // unique: true,
      sparse: true,
    },
    aadharCardNo: {
      type: String,
      // unique: true,
      required: true,
      sparse: true,
    },
    janAadharCardNo: {
      type: String,
      sparse: true,
    },
    dateOfBirth: {
      type: Date,
    },
    caste: {
      type: String,
      enum: CAST,
    },
    designation: {
      type: String,
      // enum: DESIGNATIONS,
      default: "Member",
      validate: {
        validator: function (this: IMember, value: string): boolean {
          return (
            DESIGNATIONS.includes(value as Designation) ||
            typeof value === "string"
          );
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid designation`,
      },
    },
    profession: {
      type: String,
    },
    committee: {
      type: String,
      enum: COMMITTEES,
      required: true,
    },
    isMemberShipLifeTime: {
      type: Boolean,
      default: false,
    },
    memberShipExpiresAt: {
      type: Date,
      // validate: {
      //   validator: function (value: Date): boolean {
      //     return !this.isMemberShipLifeTime || value == null;
      //   },
      // },
      default: function (this: IMember): Date | null {
        // `this` refers to the current document being created
        return this.isMemberShipLifeTime
          ? null
          : (() => {
              const currentDate = new Date();
              currentDate.setFullYear(currentDate.getFullYear() + 1); // Default to 1 year in the future
              return currentDate;
            })();
      },
    },
    // isMembershipValid: {
    //   type: Boolean,
    //   default: false,
    // },
    socialLinks: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialLink",
      },
    ],
  },
  {
    timestamps: true,
  }
);


memberSchema.pre("save", function (next) {
  if (this.isMemberShipLifeTime) {
    this.memberShipExpiresAt = null;
  }
  next();
});

const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", memberSchema);

export default Member;

// memberSchema.post("init", async () => {
//   if (!(await Member.findOne({ isAdmin: true }))) {
//     const adminMember = await Member.create({
//       name: "Admin",
//       email: "admin@example.com",
//       password: bcrypt.hashSync("password123", 10), // Hash the password
//       role: "ADMIN",
//     });
//     console.log("Admin member created:", adminMember);
//   }
// });

