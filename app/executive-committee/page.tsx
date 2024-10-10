"use client";
import CommitteePage from "@/components/common/CommitteePage";
import React from "react";

const ExecutiveMemberData = [
  {
    name: "Rajkumar Yadav",
    role: "Executive Member",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
    links: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
    links: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
    links: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
    links: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Rajkumar Yadav",
    imageUrl: "/image/member-img.png", // Replace with actual image URL or path
    links: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
    },
  },
];

const Page = () => {
  return (
    <CommitteePage
      membersData={ExecutiveMemberData}
      title="Executive committee Members"
      subTitle="Meet the pillors of our organization Meet the pillors of our organization"
    />
  );
};

export default Page;
