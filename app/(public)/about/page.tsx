"use client";
import Founders from "@/components/pages/About/Founder";
import Hero from "@/components/pages/About/Hero";
import Mission from "@/components/pages/About/Mission";
import OrganizationStats from "@/components/pages/About/OrganizationStats.tsx";
import Story from "@/components/pages/About/Story";
import React from "react";

const About = () => {
  return (
    <>
      <Hero />
      <Story />
      <Mission />
      <Founders />
      <OrganizationStats />
    </>
  );
};

export default About;
