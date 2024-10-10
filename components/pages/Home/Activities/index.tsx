"use client";
import CardCarousel from "@/components/CardCarousel";
import Card from "@/components/CardCarousel/Card";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import React from "react";

const cardsData = [
  {
    id: 1,
    title: "Providing food to the poor",
    description:
      "For past _ years we have been providing food to the poor and to ones in need, and we had a great success in doing so. We are proud to say because of us a poor person slept with a full stomach.",
    category: "Food",
    image: "/image/food-donation.png", // Path to the image or URL
    altText: "Volunteers providing food to poor people",
  },
  {
    id: 2,
    title: "Supporting Education",
    description:
      "We believe in providing equal education to all. Over the years, we've sponsored education for underprivileged children, giving them hope and a future.",
    category: "Education",
    image: "/image/blood-donatation.png",
    altText: "Children attending school with donated supplies",
  },
  {
    id: 3,
    title: "Medical Assistance",
    description:
      "Offering medical assistance to those in need is at the core of our mission. Thousands of families have benefited from our free medical camps.",
    category: "Health",
    image: "/image/food-donation.png",
    altText: "Doctors providing medical aid to a family",
  },
  {
    id: 4,
    title: "Clean Water Initiative",
    description:
      "We have worked tirelessly to bring clean drinking water to communities in need. Our water purification projects have impacted thousands of lives.",
    category: "Water",
    image: "/image/blood-donatation.png",
    altText: "Volunteers installing clean water systems in villages",
  },
  {
    id: 5,
    title: "Empowering Women",
    description:
      "Empowering women through skill development and providing opportunities for self-reliance has been one of our key initiatives.",
    category: "Empowerment",
    image: "/image/food-donation.png",
    altText: "Women learning skills in a workshop",
  },
  {
    id: 6,
    title: "Environmental Protection",
    description:
      "Our organization has been planting trees and organizing environmental awareness drives to fight climate change and protect our planet.",
    category: "Environment",
    image: "/image/blood-donatation.png",
    altText: "Volunteers planting trees",
  },
];

const Activities = () => {
  return (
    // <div className="flex justify-center w-full">
    //   <div className=" relative grid grid-cols-10">
    // <SectionWrapper className="mt-24 mx-auto">
    <SectionWrapper className="mt-20 ">
      <div className="flex flex-col sm:gap-6 gap-4">
        <Heading variant="medium">Core Activities and Programs</Heading>
        <p className="font-medium text-my-para sm:text-lg text-base">
          Hers is what we mostly do{" "}
        </p>
        <CardCarousel>
          {cardsData.map((cardData, index) => (
            <Card data={cardData} key={index}>
              <Card.Header>
                <Card.Image />
                <Card.Category />
              </Card.Header>
              <Card.Content>
                <Card.Title />
                <Card.Description />
              </Card.Content>
            </Card>
          ))}
        </CardCarousel>
      </div>
    </SectionWrapper>
    //   </div>
    // </div>
  );
};

export default Activities;
