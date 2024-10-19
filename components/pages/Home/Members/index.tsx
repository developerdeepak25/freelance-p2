"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React from "react";
import MemberList from "@/components/common/MemberList";
import Heading from "@/components/Text/Heading";
import MemberCard from "@/components/MemberCard/MemberCard";
import { ClientMember } from "@/Types/types";


const membersData : ClientMember[] = [
  {
    _id: "1",
    designation: "Founder",
    email: "VJfzT@example.com",
    name: "Rajkumar Yadav",
    committee: "Founder",
    socialLinks: [
      {
        platform: "linkedin",
        url: "/image/ghfgf-fghfgh.com",
      },
    ],
    photo: "/image/member-img.png",
  },
  {
    _id: "1",
    designation: "Founder",
    email: "VJfzT@example.com",
    name: "Rajkumar Yadav",
    committee: "Founder",
    socialLinks: [
      {
        platform: "linkedin",
        url: "/image/ghfgf-fghfgh.com",
      },
    ],
    photo: "/image/member-img.png",
  },
  {
    _id: "1",
    designation: "Founder",
    email: "VJfzT@example.com",
    name: "Rajkumar Yadav",
    committee: "Founder",
    socialLinks: [
      {
        platform: "linkedin",
        url: "/image/ghfgf-fghfgh.com",
      },
    ],
    photo: "/image/member-img.png",
  },
  {
    _id: "1",
    designation: "Founder",
    email: "VJfzT@example.com",
    name: "Rajkumar Yadav",
    committee: "Founder",
    socialLinks: [
      {
        platform: "linkedin",
        url: "/image/ghfgf-fghfgh.com",
      },
    ],
    photo: "/image/member-img.png",
  },
  {
    _id: "1",
    designation: "Founder",
    email: "VJfzT@example.com",
    name: "Rajkumar Yadav",
    committee: "Founder",
    socialLinks: [
      {
        platform: "linkedin",
        url: "/image/ghfgf-fghfgh.com",
      },
    ],
    photo: "/image/member-img.png",
  },
  
];

const Members = () => {
  return (
    <div className="bg-gray-50 w-screen flex justify-center">
      <SectionWrapper>
        <div className="py-20 flex flex-col gap-16 items-center">
          <Heading   variant="medium" className="text-center">Meet our core members</Heading>
          <MemberList members={membersData} Component={MemberCard}/>
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
