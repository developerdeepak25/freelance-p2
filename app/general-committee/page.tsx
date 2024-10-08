"use client";
import MemberList from "@/components/common/MemberList";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import React from "react";

const ExecutiveMemberData = [
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
  },
];

const Page = () => {
  return (
    <SectionWrapper className="pt-40">
      <div className="pb-20 flex flex-col gap-16 items-center">
        <Heading variant="medium">General committee Members </Heading>
        <MemberList members={ExecutiveMemberData} />
      </div>
    </SectionWrapper>
  );
};

export default Page;
