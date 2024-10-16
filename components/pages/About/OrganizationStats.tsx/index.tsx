"use client";
import CalendarIcon from "@/assets/icons/CalenderIcon";
import EventIcon from "@/assets/icons/EventIcon";
import GroupIcon from "@/assets/icons/GroupIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React from "react";

interface StatProps {
  icon: React.ReactNode;
  text: string;
  value: string;
}

interface StatData {
  id: number;
  icon: React.ReactNode;
  text: string;
  value: string;
}

const statsData: StatData[] = [
  {
    id: 1,
    icon: <CalendarIcon />,
    text: "Date of Foundation",
    value: "Jan 2008",
  },
  {
    id: 2,
    icon: <LocationIcon />,
    text: "Establishment at",
    value: "Bagru, Jaipur",
  },
  {
    id: 3,
    icon: <EventIcon />,
    text: "Events hosted",
    value: "50+",
  },
  {
    id: 4,
    icon: <GroupIcon />,
    text: "Members joined",
    value: "60+",
  },
];

const Stat: React.FC<StatProps> = ({ icon, text, value }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      {icon}
      <p className="font-medium text-base text-my-para">{text}</p>
      <p className="font-medium text-xl text-my-heading">{value}</p>
    </div>
  );
};

const OrganizationStats: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="py-20">
        {/* <div className="flex justify-around items-center   flex-wrap gap-16    "> */}
        <div className="flex justify-around items-center   flex-wrap gap-20    ">
          {statsData.map((stat) => (
            <Stat
              key={stat.id}
              icon={stat.icon}
              text={stat.text}
              value={stat.value}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OrganizationStats;
