"use client";
import { ClientMember } from "@/Types/types";
import React from "react";
import profilePic from "@/assets/profile-picture.png";
import ImageWithSkeleton from "../ImageWithSkelton";

// interface MemberCardProps {
//   name: string;
//   role?: string;
//   photo: string;
//   links?: {
//     instagram?: string;
//     twitter?: string;
//     facebook?: string;
//   };
// }

const MemberCard: React.FC<ClientMember> = ({
  name,
  committee,
  // socialLinks,
  phoneNo,
  photo,
}) => {
  console.log("photo", photo);
  
  return (
    <div className="flex flex-col gap-2 items-center justify-center  relative bg-[#f2f2f2] rounded-2xl  px-10 py-12 overflow-hidden ">
      {/* object */}
      <div className="absolute -top-[230px]     w-[350px] aspect-square bg-[#E6E6E6] rounded-full"></div>

      {/* Image section */}
      <div className="sm:w-32 w-48 aspect-square rounded-full overflow-hidden relative border-[4px] border-[#fff]">
        <ImageWithSkeleton
          // src={photo ?? profilePic}
          src={photo ? photo : profilePic}
          alt={name}
          className="object-cover w-full h-full absolute "
          fill={true}
        />
      </div>

      {/* Name, Role, and link  */}
      <div className="flex flex-col items-center gap-2">
        {/* <p className="mt-4 text-lg font-bold text-my-heading text-center"> */}
        <p className="text-base font-bold text-my-heading text-center">
          {name}
        </p>
        {committee && (
          <p className="text-sm font-normal text-my-para text-center">
            {committee}
          </p>
        )}

        {phoneNo && (
          <p className="text-sm font-normal text-my-para text-center">
            {phoneNo}
            {/* {socialLinks.map((socialLink) => (
              <a
                key={socialLink.platform}
                href={socialLink.url}
                target="_blank"
                rel="noreferrer noopener"
                className="opacity-65 hover:opacity-100"
              >
                {socialLink.platform === "instagram" && <InstagramIcon />}
                {socialLink.platform === "twitter" && <TwitterIcon />}
                {socialLink.platform === "facebook" && <FacebookIcon />}
              </a>
            ))} */}
            {/* {Object.entries(links).map(
              ([platform, url]) =>
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="opacity-65 hover:opacity-100"
                  >
                    {platform === "instagram" && <InstagramIcon />}
                    {platform === "twitter" && <TwitterIcon />}
                    {platform === "facebook" && <FacebookIcon />}
                  </a>
                )
            )} */}
          </p>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
