import NoEventIcon from "@/assets/icons/NoEventIcon";
import CardCarousel from "@/components/CardCarousel";
import Card from "@/components/CardCarousel/Card";
import Heading from "@/components/Text/Heading";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

type Event = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  venue: string;
  highlights: string;
};

type EventsMapProps = {
  type: 'upcoming' | 'past';
  NoEventFallbackText: string;
}


export const EventsMap = ({type, NoEventFallbackText}:EventsMapProps) => {
  const [event, setEvent] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [iserror, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/public/events?event=${type}`, {
          cache: "no-store",
        });
        // const data = await response.json();
        const data = await response.json();
        // console.log(response, data);
        setEvent(data);
      } catch (error) {
        setIsError(true);

        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className=" aspect-square animate-spin" height={40}  width={40}/>;
      </div>
    );
  }

  if (iserror) {
    return (
      <div className="flex justify-center items-center">
        <Heading variant="medium">Something went wrong!!</Heading>;
      </div>
    );
  }

  return event.length === 0 ? (
    <NoEventFallback text={NoEventFallbackText} />
  ) : (
    <CardCarousel>
      {event.map((cardData, index) => (
        <Card data={cardData} key={index}>
          <Card.Header>
            <Card.Image />
            <Card.Highlights />
          </Card.Header>
          <Card.Content>
            <Card.Title />
            <Card.Description />
            <Card.TimeAndVenue />
          </Card.Content>
        </Card>
      ))}
    </CardCarousel>
  );
};

const NoEventFallback = ({text}: {text: string}) => {
  return (
    <div className="flex flex-col justify-center items-center py-16 gap-4">
      <div className=" p-10 bg-gray-200 rounded-full grid place-content-center w-fit">
        <NoEventIcon />
      </div>
      <p className="text-lg font-bold text-my-para">
        {text}
        {/* There are no events published yet */}
      </p>
    </div>
  );
};
