"use client";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import React, { createContext, useContext, ReactNode } from "react";

// Define the type for Card data
type CardDataType = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  altText: string;
  dateAndTime?: string;
  location?: string;
};

// Sample card data
// const cardData: CardDataType = {
//   id: 1,
//   title: "Providing food to the poor",
//   description:
//     "For past _ years we have been providing food to the poor and to ones in need, and we had a great success in doing so. We are proud to say because of us a poor person slept with a full stomach.",
//   category: "Food",
//   image: "/image/food-donation.png",
//   altText: "Volunteers providing food to poor people",
// };

// Create a context for the card data
const CardContext = createContext<CardDataType | null>(null);

// Main Card component
const Card = ({
  data,
  children,
}: {
  data: CardDataType;
  children: ReactNode;
}) => {
  return (
    <CardContext.Provider value={data}>
      <CarouselItem className="basis-1/3 pl-10">
        <div className="w-full rounded-2xl overflow-hidden border-[1px] border-gray-300">
          {children}
        </div>
      </CarouselItem>
    </CardContext.Provider>
  );
};

// structue of this card compount coponet is like this
{
  /* <Card data={cardData} key={index}>
  <Card.Header>
    <Card.Image />
    <Card.Category />
  </Card.Header>
  <Card.Content>
    <Card.Title />
    <Card.Description />
    <Card.DateAndTime />
    <Card.Location />
  </Card.Content>
</Card>; */
}

// Hook to use the Card context
const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error(
      "Card compound components must be used within a Card component"
    );
  }
  return context;
};

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-56 relative">{children}</div>;
};

Card.Image = function CardImage() {
  const { image, altText } = useCardContext();
  return (
    <Image
      src={image}
      alt={altText}
      className="object-cover absolute top-0 left-0 right-0 bottom-0"
      fill={true}
    />
  );
};

Card.Category = function CardCategory() {
  const { category } = useCardContext();
  return (
    <div className="bg-primary-light rounded-tl-lg rounded-tr-lg py-1 px-6 text-white font-medium absolute bottom-0 right-5">
      {category}
    </div>
  );
};

Card.Content = function CardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col px-6 py-8 gap-6">{children}</div>;
};

Card.Title = function CardTitle() {
  const { title } = useCardContext();
  return <div className="font-bold text-2xl">{title}</div>;
};

Card.Description = function CardDescription() {
  const { description } = useCardContext();
  return <p className="font-normal text-base text-my-para">{description}</p>;
};
Card.TimeAndLocation = function TimeAndLocation() {
  const { dateAndTime, location } = useCardContext();

  return (
    <div className="flex flex-col gap-2">
      {dateAndTime && (
        <p className="font-normal text-sm text-my-heading">
          Date - {dateAndTime}
        </p>
      )}
      {location && (
        <p className="font-normal text-sm text-my-heading">Location - {location}</p>
      )}{" "}
    </div>
  );
};

export default Card;
