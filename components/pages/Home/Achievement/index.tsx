"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import SplitContentSection from "@/components/common/SplitContentSection";

import React from "react";

const achievementSectionData = {
  imageSrc: "/image/achievment-section-img.png",
  imageAlt: "Achievement section image",
  sectionTitle: "OUR ACHIEVEMENT",
  heading: "What we were able to achieve.",
  description:
    "Over the past year and a half, we have made significant strides in supporting the local community of Bagru, Jaipur. Our team successfully organized several blood donation camps, providing much-needed medical resources to hospitals and clinics in the area. Alongside this, we were able to deliver food to those in need, thanks to the dedicated efforts of our volunteers and the generous support of new members who joined our cause. In addition, we have extended support to the elderly through various initiatives, ensuring they receive care, companionship, and essential services during these challenging times.",
  buttonText: "Join Us",
  // onButtonClick: () => console.log("Join Us button clicked"),
  imageOnLeft: true,
};

const Achievement = () => {
  return (
    <SectionWrapper>
      <SplitContentSection {...achievementSectionData} />
    </SectionWrapper>
  );
  // return (
  //   <SectionWrapper>
  //     <div className="flex gap-44 px-20 mt-28 pb-12 ">
  //       {/* image portion */}
  //       <div className="flex items-center">
  //         <div className="w-96 h-[550px] relative overflow-hidden rounded-2xl shadow-xl shadow-gray-400">
  //           <Image
  //             src={"/image/achievment-section-img.png"}
  //             fill={true}
  //             alt="achievment-section-image"
  //             className="absolute top-0 left-0 right-0 bottom-0"
  //           />
  //         </div>
  //         <div className="bg-primary-light w-5 h-5/6 rounded-r-lg shadow-xl shadow-gray-400"></div>
  //       </div>

  //       {/* content portion */}
  //       <div className="flex flex-col gap-4 justify-center">
  //         <p className=" text-primary-light uppercase text-base font-bold">
  //           OUR ACHIEVEMENT
  //         </p>
  //         <h1 className=" text-5xl font-bold text-my-heading">
  //           What we where able to achieve.
  //         </h1>
  //         <p className=" font-normal text-my-para text-base">
  //           Over the past year and a half, we have made significant strides in
  //           supporting the local community of Bagru, Jaipur. Our team
  //           successfully organized several blood donation camps, providing
  //           much-needed medical resources to hospitals and clinics in the area.
  //           Alongside this, we were able to deliver food to those in need,
  //           thanks to the dedicated efforts of our volunteers and the generous
  //           support of new members who joined our cause. In addition, we have
  //           extended support to the elderly through various initiatives,
  //           ensuring they receive care, companionship, and essential services
  //           during these challenging time.
  //         </p>
  //         <div>
  //           <Button variant={"primary-solid"}>Join Us</Button>
  //         </div>
  //       </div>
  //     </div>
  //   </SectionWrapper>
  // );
};

export default Achievement;
