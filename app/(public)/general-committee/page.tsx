"use client";
import CommitteePage from "@/components/common/CommitteePage";
import MembersTable from "@/components/MembersTable";
import React from "react";

// const ExecutiveMemberData = [
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
//   {
//     name: "Rajkumar Yadav",
//     imageUrl: "/image/member-img.png", // Replace with actual image URL or path
//     links: {
//       facebook: "https://www.facebook.com/",
//       instagram: "https://www.instagram.com/",
//       twitter: "https://twitter.com/",
//     },
//   },
// ];

const Page = () => {
  return (
    <CommitteePage
      // membersData={ExecutiveMemberData}
      title="General committee Members"
      subTitle="Meet the pillors of our organization Meet the pillors of our organization"
    >
      <MembersTable/>
    </CommitteePage>
    // <SectionWrapper className="pt-40">
    //   <div className="pb-20 flex flex-col gap-16 items-center">
    //     <Heading variant="medium">General committee Members </Heading>
    //     <MemberList members={ExecutiveMemberData} Component={MemberCard} />
    //   </div>
    // </SectionWrapper>
  );
};

export default Page;
