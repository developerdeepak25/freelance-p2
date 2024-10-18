'use client';
import { AddButton } from "@/components/buttons/ModifiedButton";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import PastEvent from "@/components/pages/Events/PastEvent";
import UpcommmingEvents from "@/components/pages/Home/UpcommingEvents";
import Heading from "@/components/Text/Heading";
import React from "react";

const AdminEventPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <SectionWrapper className="pt-40">
        <div className="flex justify-between items-center gap-3 pb-2">
          <Heading variant="medium" className="text-center">
            Admin Gallery
          </Heading>
          <AddButton onClick={() => setIsModalOpen(true)}>Add</AddButton>
        </div>
        {/* <div className="mt-10 flex flex-col items-center gap-20"></div> */}
      </SectionWrapper>
      <UpcommmingEvents />
      <PastEvent />
    </>
  );
};

export default AdminEventPage;
