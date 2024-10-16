"use client";
// components/layout/HeroWrapperWithImageAndGradient.tsx
import React, { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/utils/taliwind";

interface HeroWrapperWithImageAndGradientProps {
  children: ReactNode;
  backgroundImage: string;
  altText: string;
  className?: string;
}

const HeroWrapperWithImageAndGradient = ({
  children,
  backgroundImage,
  altText,
  className,
}: HeroWrapperWithImageAndGradientProps) => {
  return (
    <div
      className={cn(
        "w-screen h-[780px] relative overflow-hidden flex justify-center",
        className
      )}
    >
      {/* Hero overlay and image */}
      <div className="absolute top-0 left-0 right-0 w-full h-full z-0">
        <Image
          src={backgroundImage}
          alt={altText}
          fill={true}
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="bg-hero-gradient absolute top-0 left-0 right-0 w-full h-full"></div>
      </div>
      {/* Children content */}
      <div className="z-10">{children}</div>
    </div>
  );
};

export default HeroWrapperWithImageAndGradient;
