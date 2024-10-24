// "use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import GalleryEvents from "../GalleryEvents";

const Gallery = () => {
  return (
    <SectionWrapper className="pt-40 pb-40">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <Heading variant="medium" className="text-center">
            Our Memorable Moments
          </Heading>
          <p className="text-base text-my-para font-bold text-center">
            Sneak a Peek into Our Most Memorable Experiences
          </p>
        </div>
      </div>
      <div className=" mt-20 flex flex-col items-center gap-20">
        <GalleryEvents />
      </div>
    </SectionWrapper>
  );
};

export default Gallery;
