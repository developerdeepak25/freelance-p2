"use client";
import WellBeingIcon from "@/assets/icons/WellBWingIcon";
import HeroWrapperWithImageAndGradient from "@/components/Layout/HeroWrapperWithImageAndGradient";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    // <div className="w-screen h-[780px]  relative overflow-hidden flex justify-center">
    //   {/* hero overlay andd image */}
    //   <div className="absolute top-0 left-0 right-0 w-full h-full z-0">
    //     <Image
    //       src="/image/hero-img.png"
    //       alt="hero section image"
    //       fill={true}
    //       className="object-cover"
    //     />
    //     {/* gradient overlay */}
    //     <div className="bg-hero-gradient absolute top-0 left-0 right-0 w-full h-full"></div>
    //   </div>
    <HeroWrapperWithImageAndGradient
      backgroundImage={"/image/home-hero.png"}
      altText={"hero section image"}
    >
      <SectionWrapper className=" h-full ">
        {/* Hero content */}
        <div className=" grid grid-cols-10 relative">
          <div className=" pt-48 sm:pt-48 md:pt-72 col-span-10 sm:col-span-8 lg:col-span-6 flex flex-col gap-6">
            <div className="bg-gray-600/50 py-[6px] px-7 flex gap-2 items-center rounded-3xl max-w-fit">
              <WellBeingIcon className="grow shrink-0" />{" "}
              <p className="text-white text-xs">
                Together for a Better Tomorrow
              </p>
            </div>
            <h1 className="text-4xl  sm:text-5xl lg:text-7xl font-black text-white">
              Helping Communities Grow Together
            </h1>
            <p className="font-medium text-white sm:pr-28">
              Working for the well-being of society with programs that bring
              positive change and support for those in need.
            </p>
            <div className="flex gap-5  flex-col sm:flex-row">
              <Button>
                <Link href={"/contact"}>Contact Us</Link>
              </Button>
              {/* <Button variant={"secondary"}>
                <Link href={"/contact"}>Donate Us</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </HeroWrapperWithImageAndGradient>
    // </div>
  );
};

export default Hero;
