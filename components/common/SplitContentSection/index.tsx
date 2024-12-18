"use client";
import React from "react";
import Image from "next/image";
import Heading from "@/components/Text/Heading";

interface SplitContentSectionProps {
  imageSrc: string;
  sectionTitle: string;
  heading: string;
  // description: string;
  descBullets: string[];
  // buttonText: string;
  // onButtonClick: () => void;
  imageOnLeft?: boolean;
}

const SplitContentSection: React.FC<SplitContentSectionProps> = ({
  imageSrc,
  sectionTitle,
  heading,
  descBullets,
  // buttonText,
  // onButtonClick,
  imageOnLeft = true,
}) => {
  const contentSection = (
    <div className="flex flex-col sm:gap-4 gap-5 justify-center">
      <p className="text-primary-light uppercase text-base sm:font-bold font-medium">
        {sectionTitle}
      </p>
      <Heading variant="large">{heading}</Heading>
      <ul className="flex flex-col gap-2">
        {descBullets.map((bullet, index) => (
          <li key={index} className="font-normal text-my-para text-base flex">
            <span className="text-my-heading text-2xl pr-2 leading-none">
              -{" "}
            </span>{" "}
            {bullet}
          </li>
        ))}
      </ul>
      {/* <p className="font-normal text-my-para text-base">{description}</p> */}
      <div>
        {/* <Button variant="primary-solid" onClick={onButtonClick}>
          {buttonText}
        </Button> */}
      </div>
    </div>
  );

  const imageSection = (
    // <div className="flex items-center lg:flex-row flex-col order-last lg:order-first">
    <div className="flex items-center lg:flex-row flex-col ">
      <div className="lg:w-96 w-full lg:h-[550px] md:h-[450px] h-[300px] relative overflow-hidden rounded-2xl shadow-xl shadow-gray-400">
        <Image
          src={imageSrc}
          fill={true}
          alt="section-image"
          className="absolute top-0 left-0 right-0 bottom-0 object-cover lg:object-center object-bottom "
        />
      </div>
      <div className="bg-primary-light lg:w-5 w-5/6  lg:h-5/6 sm:h-5 h-3 lg:rounded-r-lg lg:rounded-bl-none rounded-b-lg shadow-xl shadow-gray-400 grow z-10"></div>
    </div>
  );

  return (
    // <div className="flex lg:flex-row flex-col xl:gap-44 md:gap-16 gap-12 xl:px-20 px-0 mt-20 lg:py-12 py-0">
    <div className="flex lg:flex-row flex-col xl:gap-44 md:gap-16 gap-12 xl:px-20 px-0 mt-20 lg:py-12 py-0 max-sm:border-t-[1px] max-sm:border-gray-300 max-sm:pt-20 ">
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
