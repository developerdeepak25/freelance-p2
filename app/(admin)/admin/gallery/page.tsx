"use client";
import React, { useState } from "react";
import { AddButton } from "@/components/buttons/ModifiedButton";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import GalleryEvents from "@/components/pages/Gallery/GalleryEvents";
import CreateGalleryEventModal from "@/components/pages/Gallery/CreateGalleryEventModal";

const AdminGallery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SectionWrapper className="pt-40 pb-40">
      <div className="flex max-sm:flex-col flex-row justify-between max-sm:items-start items-center  gap-3 pb-2">
        <Heading variant="medium">Admin Gallery Manager</Heading>
        <AddButton onClick={() => setIsModalOpen(true)}>Add</AddButton>
      </div>
      {/* gallery events wrapper */}
      <div className="mt-20 flex flex-col items-center gap-20">
        <GalleryEvents />
      </div>
      {/* //TODO - create a comp out of this modal  */}

      <CreateGalleryEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </SectionWrapper>
  );
};

export default AdminGallery;
