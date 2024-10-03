"use client";
import Image from "next/image";
import React from "react";

interface MemberCardProps {
  name: string;
  role?: string;
  imageUrl: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ name, role, imageUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg">
      {/* Image section */}
      <div className="w-44 h-44 rounded-full overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full absolute "
          fill={true}
        />
      </div>

      {/* Name and Role */}
      <p className="mt-4 text-lg font-bold text-my-heading">{name}</p>
      {role && <p className="text-sm font-light text-my-para">{role}</p>}
    </div>
  );
};

export default MemberCard;