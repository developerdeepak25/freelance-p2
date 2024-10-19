"use client";
import { DeteteButton, EditButton } from "@/components/buttons/ModifiedButton";
import EditEventModal from "@/components/pages/Events/EditEventModal";
import Heading from "@/components/Text/Heading";
import { CarouselItem } from "@/components/ui/carousel";
import { useAppSelector } from "@/store/hooks";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { toast } from "sonner";

// Define the type for Card data
export type CardDataType = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  highlights?: string;
};
// type CardDataType = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   image: string;
//   altText: string;
//   dateAndTime?: string;
//   location?: string;
// };

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
      <CarouselItem className="md:basis-1/2 xl:basis-1/3 pl-10">
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
  const cardData = useCardContext();
  const { isAuthenticated } = useAppSelector((state) => state.Auth);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/events/${cardData._id}`);

      if (res.status !== 200 && res.status !== 204 && res.status !== 201) {
        toast.error("Error deleting gallery item");
        return;
      }

      toast.success("Gallery item deleted successfully");
      // Optionally, you can add a function to update the gallery list after deletion
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          const errMessage = error.response?.data?.error;
          console.log(errMessage);
          if (errMessage) {
            return toast.error(errMessage);
          }
        }
      }
      toast.error("Error deleting gallery item");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full h-56 relative">
        {children}
        {isAuthenticated && (
          <div className="absolute top-0 right-0 p-2 flex gap-1">
            <EditButton size={"icon"} onClick={() => setIsModalOpen(true)} />
            <DeteteButton
              size={"icon"}
              onClick={handleDelete}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
      <EditEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editData={cardData}
      />
    </>
  );
};

Card.Image = function CardImage() {
  const { thumbnail, title } = useCardContext();
  return (
    <Image
      src={thumbnail}
      alt={title}
      className="object-cover absolute top-0 left-0 right-0 bottom-0"
      fill={true}
    />
  );
};

Card.Highlights = function CardHighlights() {
  const { highlights } = useCardContext();
  if (!highlights) return null;
  return (
    <a href={highlights} target="_blank" rel="noopener noreferrer">
      <div className="bg-primary-light rounded-tl-lg rounded-tr-lg py-1 px-6 text-white font-medium absolute bottom-0 right-5 flex gap-1 items-center ">
        highlight
        <div>
          {" "}
          <SquareArrowOutUpRight className="h-4 aspect-square" />
        </div>
      </div>
    </a>
  );
};

Card.Content = function CardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col px-6 py-8 sm:gap-6 gap-4">{children}</div>
  );
};

Card.Title = function CardTitle() {
  const { title } = useCardContext();
  return <Heading variant="small">{title}</Heading>;
  // return <Heading variant="small" className="text-nowrap text-ellipsis overflow-hidden">{title}</Heading>;
};

// Card.Description = function CardDescription() {
//   const { description } = useCardContext();
//   return <p className="font-normal text-base text-my-para">{description}</p>;
// };

const CHARACTER_LIMIT = 150;

Card.Description = function CardDescription() {
  const { description } = useCardContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = description.length > CHARACTER_LIMIT;
  const truncatedDescription = shouldTruncate
    ? description.slice(0, CHARACTER_LIMIT) + "..." + "   "
    : description;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p
        className={`font-normal text-base text-my-para ${
          isExpanded ? "overflow-auto max-h-36" : ""
        }`}
      >
        {isExpanded ? description : truncatedDescription}
        {shouldTruncate && (
          <button
            onClick={toggleExpanded}
            className="text-blue-500 underline text-sm"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
};

// export default CardDescription;

Card.TimeAndVenue = function TimeAndVenue() {
  // const { dateAndTime, location } = useCardContext();
  const { startDate, endDate, venue } = useCardContext();
  console.log("startDate", startDate);
  const sdate = new Date(startDate);
  console.log(sdate);

  return (
    <div className="flex flex-col gap-2">
      {(startDate || endDate) && (
        <p className="font-normal text-sm text-my-heading">
          {/* Date - {dateAndTime} */}
          {format(sdate, "MMM d")}
          {endDate && <span> - {format(endDate, "MMM d")}</span>}
        </p>
      )}
      {venue && (
        <p className="font-normal text-sm text-my-heading">Venue - {venue}</p>
      )}{" "}
    </div>
  );
};

export default Card;
