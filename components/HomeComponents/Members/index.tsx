"use client";
import MemberCard from "@/components/MemberCard";
import SectionWrapper from "@/components/SectionWrapper";
import React from "react";

const membersData = [
  {
    name: "Rajkumar Yadav",
    role: "Founder & Leader",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Executive Member",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Executive Member",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Executive Member",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Executive Member",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Executive Member",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
];

const Members = () => {
  return (
    <div className="bg-gray-200 w-screen flex justify-center">
      <SectionWrapper>
        <div className="py-20">
          <div className="flex gap-20 flex-wrap justify-around px-20">
            {membersData.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Members;
