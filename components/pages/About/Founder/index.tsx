"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React from "react";
import MemberList from "@/components/common/MemberList";
import Heading from "@/components/Text/Heading";
import MemberCard from "@/components/MemberCard/MemberCard";

const foundersData = [
  {
    name: "Rajkumar Yadav",
    role: "Founder",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Founder",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Founder",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Founder",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    role: "Founder",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
];

const Founders = () => {
  return (
    <div className="bg-gray-50 w-screen flex justify-center mt-20">
      <SectionWrapper>
        <div className="py-20 flex flex-col gap-16 items-center">
          <Heading variant="medium" className="text-center">Meet founders of MEVS </Heading>
          <MemberList members={foundersData} Component={MemberCard}/>

          {/* <div className="flex gap-20 flex-wrap justify-around px-20">
            {foundersData.map((member, index) => (
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

export default Founders;
