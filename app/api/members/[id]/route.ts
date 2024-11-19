import dbConnect from "@/lib/dbConnect";
import Member, { IMember } from "@/models/Member";
import SocialLink, { ISocialLink, PLATFORMS } from "@/models/SocialLink";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/utils/cloudnaryUtils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const memberId = params.id;

  try {
    await dbConnect();

    // Validate member ID
    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required." },
        { status: 400 }
      );
    }

    // Find member by ID
    const member = await Member.findById(memberId);

    // Validate member existence
    if (!member) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    const formData = await req.formData();

    const memberData: Partial<IMember> = {};
    let photoFile: File | null = null;
    let socialLinksData: string | null = null;

    // Process form data
    formData.forEach((value, key) => {
      console.log("formdatat", value, key);
      if (key === "photo" && value instanceof File) {
        console.log("photo", value, key);
        photoFile = value;
      } else if (key === "socialLinks" && typeof value === "string") {
        socialLinksData = value;
      } else if (!(value instanceof File) && key === "isMemberShipLifeTime") {
        // parsing is important for boolean values
        memberData[key as keyof IMember] = JSON.parse(value);
      } else if (key === "memberShipExpiresAt") {
        // if this check was not ther and if user sends a falsey('',null,etc) value that value would have stored in DB overwrting older timestamp we will overwrite it only when new timestamp is provided
        if (value) {
          memberData[key as keyof IMember] = value;
          memberData["isMemberShipLifeTime"] = false;
        }
      } else if (
        typeof value === "string" &&
        key !== "photo" &&
        key !== "socialLinks"
      ) {
        console.log("strind", value, key);
        memberData[key as keyof IMember] = value;
        // memberData[key as keyof IMember] = value === "" ? null : value;
      }
    });
    console.log("memberData", memberData);
    console.log(
      "memberData",
      typeof memberData.isMemberShipLifeTime,
      typeof memberData.memberShipExpiresAt
    );

    // validating membership data
    // if (memberData?.isMemberShipLifeTime) {
    //   memberData.memberShipExpiresAt = null;
    // }else if

    // Check for existing unique fields
    const uniqueFields: (keyof IMember)[] = [
      "email",
      "panCardNo", // under testing
      "aadharCardNo", // under testing
    ];
    for (const field of uniqueFields) {
      if (memberData[field] && memberData[field] !== member[field]) {
        const existingMember = await Member.findOne({
          [field]: memberData[field],
          _id: { $ne: memberId },
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

        memberData.photo = photo.secure_url;
        memberData.cloudinaryPhotoId = photo.public_id;

        // Delete old photo from Cloudinary if it exists
        if (member.cloudinaryPhotoId) {
          await deleteFromCloudinary(member.cloudinaryPhotoId);
        }
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json(
          { error: "An error occurred while uploading the photo." },
          { status: 400 }
        );
      }
    }

    // Update member fields
    Object.assign(member, memberData);

    // Handle social links
    if (socialLinksData) {
      try {
        const socialLinks = JSON.parse(socialLinksData) as ISocialLink[];
        if (Array.isArray(socialLinks)) {
          // Remove all existing social links for this member
          await SocialLink.deleteMany({ member: memberId });

          const socialLinkIds = await Promise.all(
            socialLinks.map(async (socialLink: ISocialLink) => {
              if (!socialLink.url || !PLATFORMS.includes(socialLink.platform)) {
                throw new Error("Invalid social link data");
              }
              const newSocialLink = new SocialLink({
                platform: socialLink.platform,
                url: socialLink.url,
                member: memberId,
              });
              const savedSocialLink = await newSocialLink.save();
              return savedSocialLink._id;
            })
          );
          member.socialLinks = socialLinkIds;
        }
      } catch (error) {
        console.error("Social links processing error:", error);
        return NextResponse.json(
          { error: "An error occurred while processing social links." },
          { status: 400 }
        );
      }
    }

    // Save updated member
    await member.save();
    await member.populate("socialLinks");
    // console.log("🚀 ~ PUT ~ updated member:", member);

    // Return updated member
    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while updating the member." },
      { status: 500 }
    );
  }
}

/**
 * Delete a member
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const memberId = params.id;

  try {
    await dbConnect();

    // Validate member ID
    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required." },
        { status: 400 }
      );
    }

    // Find member by ID
    const member = await Member.deleteOne({ _id: memberId });

    // Validate member existence
    if (!member) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    // Delete social links associated with the member
    await SocialLink.deleteMany({ member: memberId });

    // Delete the member
    // await member.remove();

    // Return success response
    return NextResponse.json(
      { message: "Member deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the member." },
      { status: 500 }
    );
  }
}
