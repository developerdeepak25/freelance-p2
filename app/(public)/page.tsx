"use client";
import React from "react";
import Hero from "@/components/pages/Home/Hero";
import Members from "@/components/pages/Home/Members";
import Story from "@/components/pages/About/Story";
import Mission from "@/components/pages/About/Mission";
import OrganizationStats from "@/components/pages/About/OrganizationStats.tsx";
import UpcomingEvents from "@/components/pages/Events/UpcomingEvents";

// type Props = {};

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden ">
        <Hero />
        {/* <Activities /> */}
        {/* <Achievement /> */}
        <Story />
        <Mission />
        <UpcomingEvents />
        <Members />
        <OrganizationStats />
      </div>
    </>
  );
}
