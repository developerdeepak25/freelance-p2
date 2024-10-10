"use client";
import HeroWrapperWithImageAndGradient from "@/components/Layout/HeroWrapperWithImageAndGradient";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React from "react";

const Hero = () => {
  return (
    <HeroWrapperWithImageAndGradient
      backgroundImage={"/image/about-hero.jpg"}
      altText={"abou section hero image"}
      className=" h-[540px]"
    >
      <SectionWrapper className="w-full h-full ">
        <div className="flex flex-col items-center justify-center gap-5 h-full">
          <h1 className="text-4xl  sm:text-5xl lg:text-7xl font-black text-white max-sm:pt-20">
            About Us
          </h1>

          <p className="font-medium text-white text-base text-center">
            Driven by the belief that together, we can achieve more{" "}
          </p>
        </div>
      </SectionWrapper>
    </HeroWrapperWithImageAndGradient>
  );
};

export default Hero;
