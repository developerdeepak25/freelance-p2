import dbConnect from "@/lib/dbConnect";
import Member from "@/models/Member";
import SocialLink from "@/models/SocialLink";
import { NextRequest, NextResponse } from "next/server";

/**
 * Update a member
 *
 * @param {NextRequest} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const memberId = params.id;

  try {
    await dbConnect();

    const body = await req.json();
    const {
      name,
      email,
      phoneNo,
      photo,
      panCardNo,
      aadharCardNo,
      dateOfBirth,
      caste,
      designation,
      profession,
      committee,
      socialLinks,
    } = body;

    // Validate member ID
    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required." },
        { status: 400 }
      );
    }

    // Find member by ID
    const member = await Member.findById(memberId).populate("socialLinks");

    // Validate member existence
    if (!member) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }
    if (email) {
      const member = await Member.findOne({ email, _id: { $ne: memberId } });
      if (member) {
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 400 }
        );
      }
    }
    if (panCardNo) {
      const member = await Member.findOne({
        panCardNo,
        _id: { $ne: memberId },
      });
      if (member) {
        return NextResponse.json(
          { error: "Pan Card Number already exists." },
          { status: 400 }
        );
      }
    }

    if (aadharCardNo) {
      const member = await Member.findOne({
        aadharCardNo,
        _id: { $ne: memberId },
      });
      if (member) {
        return NextResponse.json(
          { error: "Aadhar Card Number already exists." },
          { status: 400 }
        );
      }
    }

    // Update member fields
    member.name = name || member.name;
    member.email = email || member.email;
    member.phoneNo = phoneNo || member.phoneNo;
    member.photo = photo || member.photo;
    member.panCardNo = panCardNo || member.panCardNo;
    member.aadharCardNo = aadharCardNo || member.aadharCardNo;
    member.dateOfBirth = dateOfBirth || member.dateOfBirth;
    member.caste = caste || member.caste;
    member.designation = designation || member.designation;
    member.profession = profession || member.profession;
    member.committee = committee || member.committee;

    if (Array.isArray(socialLinks)) {
      // Remove all existing social links for this member
      await SocialLink.deleteMany({ member: memberId });

      // Create new social links
      const newSocialLinks = await SocialLink.create(
        socialLinks.map((link) => ({ ...link, member: memberId }))
      );

      // Update member with new social link IDs
      member.socialLinks = newSocialLinks.map((link) => link._id);
      //   await updatedMember.save();
    }

    // Save updated member
    await member.save();

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
