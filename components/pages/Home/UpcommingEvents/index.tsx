"use client";
import NoEventIcon from "@/assets/icons/NoEventIcon";
import CardCarousel from "@/components/CardCarousel";
import Card from "@/components/CardCarousel/Card";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import { cn } from "@/lib/utils";
import React from "react";

const upcommingEventsData = [
  {
    id: 1,
    title: "Providing food to the poor",
    description:
      "For past _ years we have been providing food to the poor and to ones in need, and we had a great success in doing so. We are proud to say because of us a poor person slept with a full stomach.",
    category: "Food",
    image: "/image/food-donation.png", // Path to the image or URL
    altText: "Volunteers providing food to poor people",
    dateAndTime: "October 15, 2024 | 10:00 AM - 4:00 PM",
    location: "Bagru Community Center, Jaipur",
  },
  {
    id: 2,
    title: "Supporting Education",
    description:
      "We believe in providing equal education to all. Over the years, we've sponsored education for underprivileged children, giving them hope and a future.",
    category: "Education",
    image: "/image/blood-donatation.png",
    altText: "Children attending school with donated supplies",
    dateAndTime: "October 15, 2024 | 10:00 AM - 4:00 PM",
    location: "Bagru Community Center, Jaipur",
  },
  {
    id: 3,
    title: "Medical Assistance",
    description:
      "Offering medical assistance to those in need is at the core of our mission. Thousands of families have benefited from our free medical camps.",
    category: "Health",
    image: "/image/food-donation.png",
    altText: "Doctors providing medical aid to a family",
    dateAndTime: "October 15, 2024 | 10:00 AM - 4:00 PM",
    location: "Bagru Community Center, Jaipur",
  },
  {
    id: 4,
    title: "Clean Water Initiative",
    description:
      "We have worked tirelessly to bring clean drinking water to communities in need. Our water purification projects have impacted thousands of lives.",
    category: "Water",
    image: "/image/blood-donatation.png",
    altText: "Volunteers installing clean water systems in villages",
    dateAndTime: "October 15, 2024 | 10:00 AM - 4:00 PM",
    location: "Bagru Community Center, Jaipur",
  },
  {
    id: 5,
    title: "Empowering Women",
    description:
      "Empowering women through skill development and providing opportunities for self-reliance has been one of our key initiatives.",
    category: "Empowerment",
    image: "/image/food-donation.png",
    altText: "Women learning skills in a workshop",
    dateAndTime: "October 15, 2024 | 10:00 AM - 4:00 PM",
    location: "Bagru Community Center, Jaipur",
  },
  {
    id: 6,
    title: "Environmental Protection",
    description:
      "Our organization has been planting trees and organizing environmental awareness drives to fight climate change and protect our planet.",
    category: "Environment",
    image: "/image/blood-donatation.png",
    altText: "Volunteers planting trees",
    dateAndTime: "October 15, 2024 | 10:00 AM - 4:00 PM",
    location: "Bagru Community Center, Jaipur",
  },
];

const UpcommmingEvents = () => {
  return (
    // <SectionWrapper className="mt-24 mx-auto pb-12">
    <SectionWrapper className={cn("mt-20  pb-12")}>
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-my-heading">
          Upcomming Events{" "}
        </h1>
        <p className="font-medium text-my-para text-lg">
          Stay informed about all upcoming events and become a part of them.{" "}
        </p>
        {upcommingEventsData.length === 0 ? (
          <NoEventFallback />
        ) : (
          <CardCarousel>
            {upcommingEventsData.map((cardData, index) => (
              <Card data={cardData} key={index}>
                <Card.Header>
                  <Card.Image />
                  {/* <Card.Category /> */}
                </Card.Header>
                <Card.Content>
                  <Card.Title />
                  <Card.Description />
                  <Card.TimeAndLocation />
                </Card.Content>
              </Card>
            ))}
          </CardCarousel>
        )}
      </div>
    </SectionWrapper>
  );
};

const NoEventFallback = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 gap-4">
      <div className=" p-10 bg-gray-200 rounded-full grid place-content-center w-fit">
        <NoEventIcon />
      </div>
      <p className="text-lg font-bold text-my-para">
        There are no events published yet{" "}
      </p>
    </div>
  );
};

export default UpcommmingEvents;
