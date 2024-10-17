"use client";
import { DeteteButton, EditButton } from "@/components/buttons/ModifiedButton";
import Heading from "@/components/Text/Heading";
import { useAppSelector } from "@/store/hooks";
import { GallerImageType } from "@/Types/types";
import Image from "next/image";
import React, { useState } from "react";
import GalleryEventEdit from "../GalleryEventEdit";

export type GalleryEventProps = {
  title: string;
  desc: string;
  images: GallerImageType[];
  seeMore: string;
  id: string;
};
const GalleryEvent = ({
  title,
  desc,
  images,
  seeMore,
  id,
}: GalleryEventProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.Auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between">
          <Heading variant="small">{title}</Heading>
          {/* see more - //TODO pass g-drive */}
          {seeMore && (
            <p className="text-my-para text-base font-semibold uppercase border-b-2 border-primary px-1 hover:text-primary  cursor-pointer">
              <a href={seeMore} target="_blank" rel="noopener noreferrer">
                see more
              </a>
            </p>
          )}
        </div>
        <p className="text-my-para text-base font-semibold">{desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4">
          {images?.map((image, index) => (
            <GalleryEventImage key={index} src={image.imageUrl} />
          ))}
        </div>
        {/* edit and delete button */}
        {isAuthenticated && (
          <div className="flex justify-end gap-2">
            <EditButton onClick={() => setIsModalOpen(true)} />
            <DeteteButton />
          </div>
        )}
      </div>
      <GalleryEventEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editData={{ title, desc, images, seeMore, id }}
      />
    </>
  );
};
const GalleryEventImage = ({ src }: { src: string }) => {
  const { isAuthenticated } = useAppSelector((state) => state.Auth);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full h-80 relative overflow-hidden rounded-lg">
        <Image
          src={src}
          width={320}
          height={320}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center w-full h-full"
          alt={"gallery image"}
        />
        {isAuthenticated && (
          <div className="absolute top-0 right-0 p-2">
            <DeteteButton size={"icon"} />
          </div>
        )}
      </div>
      {/* <p className="text-base text-my-para font-bold">{caption}</p> */}
    </div>
  );
};

export default GalleryEvent;
