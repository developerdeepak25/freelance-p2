"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React from "react";
const paras: string[] = [
  ` Over the past year and a half, we have made significant strides in
          supporting the local community of Bagru, Jaipur. Our team successfully
          organized several blood donation camps, providing much-needed medical
          resources to hospitals and clinics in the area. Alongside this, we
          were able to deliver food to those in need, thanks to the dedicated
          efforts of our volunteers and the generous support of new members who
          joined our cause. In addition, we have extended support to the elderly
          through various initiatives, ensuring they receive care,
          companionship, and essential services during these challenging time.`,
  `Over the past year and a half, we have made significant strides in supporting the local community of Bagru, Jaipur. Our team  services during these challenging time.Over the past year and a half, we have made significant strides in supporting the local community of Bagru, Jaipur. Our team  services during these challenging time.Over the past year and a half, we have made significant strides in supporting the local community of Bagru, Jaipur. Our team  services during these challenging time.`,
];
const Story = () => {
  return (
    <SectionWrapper>
      <div className=" lg:px-32 flex flex-col gap-6 mt-20 ">
        <h1 className="text-4xl font-bold text-primary-light uppercase ">
          Our Story
        </h1>
        {paras.map((para, index) => (
          <p
            key={index}
            className="text-my-para text-[18px] font-normal "
          >
            {para}
          </p>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Story;
