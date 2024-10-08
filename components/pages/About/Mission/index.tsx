"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import SplitContentSection from "@/components/common/SplitContentSection";
import React from "react";
const missionSectionData = {
  imageSrc: "/image/achievment-section-img.png",
  imageAlt: "NGO volunteers working in a community",
  sectionTitle: "OUR MISSION",
  heading: "Building a Brighter Future for All",
  description:
    "At the heart of our NGO lies a commitment to sustainable development and community empowerment. We strive to create lasting change by addressing the root causes of poverty and inequality. Our mission is to build resilient communities through education, healthcare, and economic opportunities. We work hand-in-hand with local leaders and volunteers to implement sustainable solutions that respect cultural diversity and promote social justice. By fostering partnerships and leveraging resources, we aim to create a ripple effect of positive change that extends far beyond our immediate reach. ",
  buttonText: "Get Involved",
  onButtonClick: () => console.log("Get Involved button clicked"),
  //   imageOnLeft: false,
};

const Mission = () => {
  return (
    <SectionWrapper>
      <SplitContentSection {...missionSectionData} />
    </SectionWrapper>
  );
};

export default Mission;
