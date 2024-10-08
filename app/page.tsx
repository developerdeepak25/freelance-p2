"use client";
import React from "react";
import Hero from "@/components/pages/Home/Hero";
import Activities from "@/components/pages/Home/Activities";
import Achievement from "@/components/pages/Home/Achievement";
import Members from "@/components/pages/Home/Members";
import UpcommmingEvents from "@/components/pages/Home/UpcommingEvents";

// type Props = {};

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden ">
        <Hero />
        <Activities />
        <Achievement />
        <UpcommmingEvents />
        <Members />
      </div>
    </>
  );
}
