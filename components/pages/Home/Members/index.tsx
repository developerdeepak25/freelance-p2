"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React from "react";
import MemberList from "@/components/common/MemberList";
import Heading from "@/components/Text/Heading";

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
        <div className="py-20 flex flex-col gap-16 items-center">
          <Heading   variant="medium" className="text-center">Meet our core members</Heading>
          <MemberList members={membersData} />
          {/* <div className="flex gap-20 flex-wrap justify-around px-20">
            {membersData.map((member, index) => (
              <Member
                key={index}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
              />
            ))}
          </div> */}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Members;
