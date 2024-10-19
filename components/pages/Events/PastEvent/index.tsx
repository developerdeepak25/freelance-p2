"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import React from "react";
import { EventsMap } from "../EventsMap";

const PastEvent = () => {
  return (
    // <SectionWrapper className="mt-24 mx-auto pb-12">
    <SectionWrapper className="mt-20  pb-20">
      <div className="flex flex-col gap-6">
        <Heading variant="medium">Past Events </Heading>
        <EventsMap type={"past"} NoEventFallbackText={"There are no events "} />
      </div>
    </SectionWrapper>
  );
};

// const PastEventMap = () => {
//   const [event, setEvent] = React.useState<Event[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [iserror, setIsError] = React.useState<boolean>(false);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/public/events?event=past", {
//           cache: "no-store",
//         });
//         // const data = await response.json();
//         const data = await response.json();
//         console.log(response, data);
//         setEvent(data);
//       } catch (error) {
//         setIsError(true);

//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center">
//         <Loader2 className="mr-2 h-7 aspect-square animate-spin" />;
//       </div>
//     );
//   }

//   if (iserror) {
//     return (
//       <div className="flex justify-center items-center">
//         <Heading variant="medium">Something went wrong!!</Heading>;
//       </div>
//     );
//   }

//   return event.length === 0 ? (
//     <NoEventFallback />
//   ) : (
//     <CardCarousel>
//       {event.map((cardData, index) => (
//         <Card data={cardData} key={index}>
//           <Card.Header>
//             <Card.Image />
//             <Card.Highlights />
//           </Card.Header>
//           <Card.Content>
//             <Card.Title />
//             <Card.Description />
//             <Card.TimeAndVenue />
//           </Card.Content>
//         </Card>
//       ))}
//     </CardCarousel>
//   );
// };

// const NoEventFallback = () => {
//   return (
//     <div className="flex flex-col justify-center items-center py-16 gap-4">
//       <div className=" p-10 bg-gray-200 rounded-full grid place-content-center w-fit">
//         <NoEventIcon />
//       </div>
//       <p className="text-lg font-bold text-my-para">There are no events </p>
//     </div>
//   );
// };

export default PastEvent;
