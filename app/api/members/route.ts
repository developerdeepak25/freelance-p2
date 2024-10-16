import dbConnect from "@/lib/dbConnect";
import Member from "@/models/Member";
import SocialLink, { ISocialLink, PLATFORMS } from "@/models/SocialLink";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create a new member
 *
 * @param {Request} req - API request object
 * @returns {Promise<NextResponse>} - API response
 */
export async function POST(req: NextRequest) {
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
      // isAdmin,
      socialLinks,
    } = body;
    console.log(body);

    // Validate required fields
    if (!name || !committee) {
      return NextResponse.json(
        { error: "Name and committee are required fields." },
        { status: 400 }
      );
    }

    if (email) {
      const member = await Member.findOne({ email });
      if (member) {
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 400 }
        );
      }
    }
    if (panCardNo) {
      const member = await Member.findOne({ panCardNo });
      if (member) {
        return NextResponse.json(
          { error: "Pan Card Number already exists." },
          { status: 400 }
        );
      }
    }

    if (aadharCardNo) {
      const member = await Member.findOne({ aadharCardNo });
      if (member) {
        return NextResponse.json(
          { error: "Aadhar Card Number already exists." },
          { status: 400 }
        );
      }
    }

    // Create a new member
    const newMember = new Member({
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
      // isAdmin,
    });

    // Create social links
    if (Array.isArray(socialLinks)) {
      const socialLinkPromises = socialLinks.map(
        async (socialLink: ISocialLink) => {
          // check it later
          if (!socialLink.url) {
            return NextResponse.json(
              { error: "URL is required fields." },
              { status: 400 }
            );
          }

          // check it later
          if (!PLATFORMS.includes(socialLink.platform)) {
            return NextResponse.json(
              { error: "Invalid platform." },
              { status: 400 }
            );
          }
          const newSocialLink = new SocialLink({
            platform: socialLink.platform,
            url: socialLink.url,
            member: newMember._id,
          });
          const savedSocialLink = await newSocialLink.save();
          return savedSocialLink._id;
        }
      );

      const socialLinkIds = await Promise.all(socialLinkPromises);
      newMember.socialLinks = (newMember.socialLinks || []).concat(
        socialLinkIds
      );
    }

    // Save the member
    await newMember.save();
    await newMember.populate("socialLinks");

    // Return the created member
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
