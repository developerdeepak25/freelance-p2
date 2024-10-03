import React from "react";
import Hero from "@/components/HomeComponents/Hero";
import Activities from "@/components/HomeComponents/Activities";
import Achievement from "@/components/HomeComponents/Achievement";
import UpcommmingEvents from "@/components/HomeComponents/UpcommingEvents";
import Members from "@/components/HomeComponents/Members";

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
