import Heading from "@/components/Text/Heading";
import Image from "next/image";
import React from "react";

type GalleryEventProps = {
  title: string;
  desc: string;
  images: string[];
  seeMore: string;
};
const GalleryEvent = ({ title, desc, images, seeMore }: GalleryEventProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Heading variant="small">{title}</Heading>
        {/* see more - //TODO pass g-drive */}
        <p className="text-my-para text-base font-semibold uppercase border-b-2 border-primary px-1 hover:text-primary  cursor-pointer">
          <a href={seeMore} target="_blank" rel="noopener noreferrer" >
            see more
          </a>
        </p>
      </div>
      <p className="text-my-para text-base font-semibold">{desc}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4">
        {images.map((image, index) => (
          <GalleryEventImage key={index} src={image} />
        ))}
      </div>
    </div>
  );
};
const GalleryEventImage = ({ src }: { src: string }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full h-80 relative overflow-hidden rounded-lg">
        <Image
          src={src}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center w-full h-full"
          alt={"gallery image"}
        />
      </div>
      {/* <p className="text-base text-my-para font-bold">{caption}</p> */}
    </div>
  );
};

export default GalleryEvent;
