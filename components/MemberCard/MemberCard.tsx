"use client";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import Image from "next/image";
import React from "react";

interface MemberCardProps {
  name: string;
  role?: string;
  imageUrl: string;
  links?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  links,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center  relative bg-[#f2f2f2] rounded-2xl px-10 py-12 overflow-hidden ">
      {/* object */}
      <div className="absolute -top-[230px]     w-[350px] aspect-square bg-[#E6E6E6] rounded-full"></div>
      {/* Image section */}
      <div className="w-32 aspect-square rounded-full overflow-hidden relative border-[4px] border-[#fff]">
        <Image
          src={imageUrl}
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
        {role && (
          <p className="text-sm font-normal text-my-para text-center">
            {role}
          </p>
        )}

        {links && (
          <div className="flex gap-2">
            {Object.entries(links).map(
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
