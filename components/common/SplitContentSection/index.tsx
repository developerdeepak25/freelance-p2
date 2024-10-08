'use client'
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SplitContentSectionProps {
  imageSrc: string;
  sectionTitle: string;
  heading: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  imageOnLeft?: boolean;
}

const SplitContentSection: React.FC<SplitContentSectionProps> = ({
  imageSrc,
  sectionTitle,
  heading,
  description,
  buttonText,
  onButtonClick,
  imageOnLeft = true,
}) => {
  const contentSection = (
    <div className="flex flex-col gap-4 justify-center">
      <p className="text-primary-light uppercase text-base font-bold">
        {sectionTitle}
      </p>
      <h1 className="text-5xl font-bold text-my-heading">{heading}</h1>
      <p className="font-normal text-my-para text-base">{description}</p>
      <div>
        <Button variant="primary-solid" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const imageSection = (
    <div className="flex items-center">
      <div className="w-96 h-[550px] relative overflow-hidden rounded-2xl shadow-xl shadow-gray-400">
        <Image
          src={imageSrc}
          fill={true}
          alt="section-image"
          className="absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
      <div className="bg-primary-light w-5 h-5/6 rounded-r-lg shadow-xl shadow-gray-400"></div>
    </div>
  );

  return (
    <div className="flex gap-44 px-20 mt-20 py-12">
      {imageOnLeft ? (
        <>
          {imageSection}
          {contentSection}
        </>
      ) : (
        <>
          {contentSection}
          {imageSection}
        </>
      )}
    </div>
  );
};

export default SplitContentSection;
