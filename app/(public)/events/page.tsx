"use client";
import UpcommmingEvents from "@/components/pages/Events/UpcomingEvents";
import PastEvent from "@/components/pages/Events/PastEvent";
import React from "react";

const page = () => {
  return (
    <>
    <div className="pt-20">
      <UpcommmingEvents />
      <PastEvent />
    </div>
    </>
  );
};

export default page;
