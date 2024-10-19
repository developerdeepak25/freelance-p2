import dbConnect from "@/lib/dbConnect";
import Member, { IMember } from "@/models/Member";
import SocialLink, { ISocialLink, PLATFORMS } from "@/models/SocialLink";
import { uploadToCloudinary } from "@/utils/cloudnaryUtils";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 10;

/**
 * Create a new member
 *
 * @param {Request} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */

// export async function POST(req: NextRequest) {
//   try {
//     await dbConnect();

//     const formData = await req.formData();
//     formData.forEach((value, key) => {
//       console.log("formDate", key, value);
//     });

//     console.log(formData);
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const phoneNo = formData.get("phoneNo") as string;
//     const photo = formData.get("photo") as File | null;
//     const panCardNo = formData.get("panCardNo") as string;
//     const aadharCardNo = formData.get("aadharCardNo") as string;
//     const dateOfBirth = formData.get("dateOfBirth") as string;
//     const caste = formData.get("caste") as string;
//     const designation = formData.get("designation") as string;
//     const profession = formData.get("profession") as string;
//     const committee = formData.get("committee") as string;
//     const socialLinks = JSON.parse(formData.get("socialLinks") as string);
//     console.log("socialLinks", formData.get("socialLinks"), socialLinks);
//     console.log("photp", formData.get("photo"), photo);

//     // Validate required fields
//     if (!name || !committee) {
//       return NextResponse.json(
//         { error: "Name and committee are required fields." },
//         { status: 400 }
//       );
//     }

//     // Check for existing email, panCardNo, aadharCardNo
//     if (email) {
//       const existingMember = await Member.findOne({ email });
//       if (existingMember) {
//         return NextResponse.json(
//           { error: "Email already exists." },
//           { status: 400 }
//         );
//       }
//     }
//     if (panCardNo) {
//       const existingMember = await Member.findOne({ panCardNo });
//       if (existingMember) {
//         return NextResponse.json(
//           { error: "Pan Card Number already exists." },
//           { status: 400 }
//         );
//       }
//     }
//     if (aadharCardNo) {
//       const existingMember = await Member.findOne({ aadharCardNo });
//       if (existingMember) {
//         return NextResponse.json(
//           { error: "Aadhar Card Number already exists." },
//           { status: 400 }
//         );
//       }
//     }

//     // Handle photo upload
//     let photoUrl = "";
//     let cloudinaryPhotoId = "";
//     console.log(photo);

//     if (typeof photo === "object" && photo !== null) {
//       console.log("inside");

//       const uploadResult = await uploadToCloudinary(photo);

//       let thumbnail;
//       if (Array.isArray(uploadResult)) {
//         if (uploadResult.length === 0) {
//           throw new Error("Cloudinary upload failed");
//         }
//         thumbnail = uploadResult[0];
//       } else {
//         thumbnail = uploadResult;
//       }

//       photoUrl = thumbnail.secure_url;
//       cloudinaryPhotoId = thumbnail.public_id;
//     }

//     // Create a new member
//     const newMember = new Member({
//       name,
//       email,
//       phoneNo,
//       ...(photo ? { photo: photoUrl, cloudinaryPhotoId } : {}),
//       panCardNo,
//       aadharCardNo,
//       dateOfBirth,
//       caste,
//       designation,
//       profession,
//       committee,
//     });

//     // Create social links
//     if (Array.isArray(socialLinks)) {
//       const socialLinkPromises = socialLinks.map(
//         async (socialLink: ISocialLink) => {
//           if (!socialLink.url) {
//             throw new Error("URL is required for social links.");
//           }

//           if (!PLATFORMS.includes(socialLink.platform)) {
//             throw new Error("Invalid platform for social link.");
//           }

//           const newSocialLink = new SocialLink({
//             platform: socialLink.platform,
//             url: socialLink.url,
//             member: newMember._id,
//           });
//           const savedSocialLink = await newSocialLink.save();
//           return savedSocialLink._id;
//         }
//       );

//       const socialLinkIds = await Promise.all(socialLinkPromises);
//       newMember.socialLinks = socialLinkIds;
//     }

//     // Save the member
//     await newMember.save();
//     await newMember.populate("socialLinks");

//     // Return the created member
//     return NextResponse.json(newMember, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "An error occurred while creating the member." },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    console.log("formdata", formData);

    const memberData: Partial<IMember> = {};
    let photoFile: File | null = null;
    let socialLinksData: string | null = null;

    // Process form data
    formData.forEach((value, key) => {
      if (
        key === "photo" &&
        value instanceof File &&
        typeof value !== "string"
      ) {
        photoFile = value;
      } else if (key === "socialLinks" && typeof value === "string") {
        socialLinksData = value;
      } else if (
        typeof value === "string" &&
        value !== "" &&
        value !== "undefined"
      ) {
        memberData[key as keyof IMember] = value;
      }
    });
    console.log("memberData", memberData);

    // Validate required fields
    const requiredFields: (keyof IMember)[] = ["name", "committee"];
    for (const field of requiredFields) {
      if (!memberData[field]) {
        return NextResponse.json(
          { error: `Please provide ${field}.` },
          { status: 400 }
        );
      }
    }

    // Check for existing unique fields
    const uniqueFields: (keyof IMember)[] = [
      "email",
      "panCardNo",
      "aadharCardNo",
    ];
    for (const field of uniqueFields) {
      if (memberData[field]) {
        const existingMember = await Member.findOne({
          [field]: memberData[field],
        });
        if (existingMember) {
          return NextResponse.json(
            { error: `${field} already exists.` },
            { status: 400 }
          );
        }
      }
    }

    // Upload photo to Cloudinary if provided
    if (photoFile) {
      console.log("insdde");

      try {
        const uploadResult = await uploadToCloudinary(photoFile);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let photo: any;

        if (Array.isArray(uploadResult)) {
          if (uploadResult.length === 0) {
            throw new Error("Cloudinary upload failed");
          }
          photo = uploadResult[0];
        } else {
          photo = uploadResult;
        }
        console.log("photo", photo);

        memberData.photo = photo.secure_url;
        memberData.cloudinaryPhotoId = photo.public_id;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json(
          { error: "An error occurred while uploading the photo." },
          { status: 400 }
        );
      }
    }

    // Create new member
    const newMember = new Member({
      ...memberData,
      dateOfBirth: memberData.dateOfBirth
        ? new Date(memberData.dateOfBirth)
        : undefined,
    });

    // Handle social links
    if (socialLinksData) {
      try {
        const socialLinks = JSON.parse(socialLinksData) as ISocialLink[];
        if (Array.isArray(socialLinks)) {
          const socialLinkIds = await Promise.all(
            socialLinks.map(async (socialLink: ISocialLink) => {
              if (!socialLink.url || !PLATFORMS.includes(socialLink.platform)) {
                throw new Error("Invalid social link data");
              }
              const newSocialLink = new SocialLink({
                platform: socialLink.platform,
                url: socialLink.url,
                member: newMember._id,
              });
              const savedSocialLink = await newSocialLink.save();
              return savedSocialLink._id;
            })
          );
          newMember.socialLinks = socialLinkIds;
        }
      } catch (error) {
        console.error("Social links processing error:", error);
        return NextResponse.json(
          { error: "An error occurred while processing social links." },
          { status: 400 }
        );
      }
    }

    // Save member
    await newMember.save();
    await newMember.populate("socialLinks");
    console.log("🚀 ~ POST ~ newMember:", newMember);

    // Return created member
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the member." },
      { status: 500 }
    );
  }
}

/**
 * Get members
 *
 * @param {NextApiRequest} req - API request object
 * @param {NextApiResponse} res - API response object
 */

// returns all members or member of a perticular committee if query given in URL
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const committee = searchParams.get("committee")?.toUpperCase();

    // Validate committee query parameter
    const validCommittees = ["GENERAL", "EXECUTIVE"];
    const isInvalidCommittee =
      committee && !validCommittees.includes(committee);

    if (isInvalidCommittee) {
      return NextResponse.json({ error: "Invalid committee" }, { status: 400 });
    }

    // Query members
    const query = committee ? { committee } : {};
    const members = await Member.find(query).populate("socialLinks");

    // Return members
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
