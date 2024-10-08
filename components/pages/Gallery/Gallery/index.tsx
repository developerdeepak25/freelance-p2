"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import FilterButton from "./FilterButton";
import { useState } from "react";

const gallery = [
  {
    id: 1,
    imageUrl: "/image/gallery1.png",
    caption: "Lorem ipsum dolor sit amet consectetur",
    category: "blood-donation",
  },
  {
    id: 2,
    imageUrl: "/image/gallery2.png",
    caption: "Lorem ipsum dolor sit amet consectetur",
    category: "food-donation",
  },
  {
    id: 3,
    imageUrl: "/image/gallery3.png",
    caption: "Lorem ipsum dolor sit amet consectetur",
    category: "clothing",
  },
  {
    id: 4,
    imageUrl: "/image/gallery1.png",
    caption: "Hello Lorem ipsum dolor sit amet consectetur",
    category: "blood-donation",
  },
  {
    id: 5,
    imageUrl: "/image/gallery1.png",
    caption: "Hello Lorem ipsum dolor sit amet consectetur",
    category: "clothing",
  },
  {
    id: 6,
    imageUrl: "/image/gallery3.png",
    caption: "Lorem ipsum dolor sit amet consectetur",
    category: "food-donation",
  },
  {
    id: 7,
    imageUrl: "/image/gallery2.png",
    caption: "Lorem ipsum dolor sit amet consectetur",
    category: "blood-donation",
  },
  {
    id: 8,
    imageUrl: "/image/gallery3.png",
    caption: "Hello Lorem ipsum dolor sit amet consectetur",
    category: "clothing",
  },
  {
    id: 9,
    imageUrl: "/image/gallery1.png",
    caption: "Lorem ipsum dolor sit amet consectetur",
    category: "food-donation",
  },
  {
    id: 10,
    imageUrl: "/image/gallery2.png",
    caption: "New image with random category",
    category: "clothing",
  },
  {
    id: 11,
    imageUrl: "/image/gallery3.png",
    caption: "Another random image",
    category: "blood-donation",
  },
  {
    id: 12,
    imageUrl: "/image/gallery1.png",
    caption: "OThers ",
    category: "wellfare",
  },
];

const mainCategories = ["blood-donation", "food-donation", "clothing"];


const filterButtons = [
  { category: "all", text: "All" },
  { category: "blood-donation", text: "Blood donation" },
  { category: "food-donation", text: "Food donation" },
  { category: "clothing", text: "Clothing" },
    { category: "others", text: "Others" },
];

interface ImageBoxProps {
  src: string | StaticImport;
  caption: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ src, caption }) => {
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
      <p className="text-base text-my-para font-bold">{caption}</p>
    </div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState("all");

  const filteredGallery = gallery.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "others") {
      return !mainCategories.includes(item.category);
    } else {
      return item.category === filter;
    }
  });

  const handleFilterClick = (category: string) => {
    setFilter(category);
  };

  return (
    <SectionWrapper className="pt-40 pb-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <Heading variant="medium">Our Memorable Moments</Heading>
          <p className="text-base text-my-para font-bold">
            Sneak a Peek into Our Most Memorable Experiences
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {filterButtons.map((button) => (
            <FilterButton
              key={button.category}
              isActive={button.category === filter}
              onClick={() => handleFilterClick(button.category)}
            >
              {button.text}
            </FilterButton>
          ))}
        </div>
      </div>
      <div className=" mt-4 flex flex-col items-center">
        {filteredGallery.length === 0 && (
          <p className="text-base text-my-para font-bold">No images found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4">
          {filteredGallery.map((item) => (
            <ImageBox
              key={item.id}
              src={item.imageUrl}
              caption={item.caption}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Gallery;
