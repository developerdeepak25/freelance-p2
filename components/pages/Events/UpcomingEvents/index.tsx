"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import React from "react";
import { EventsMap } from "../EventsMap";



const UpcomingEvents = () => {
  return (
    // <SectionWrapper className="mt-20  pb-20">
    <SectionWrapper className="mt-20">
      <div className="flex flex-col gap-6">
        <Heading variant="medium">Upcoming Events </Heading>
        <p className="font-medium text-my-para sm:text-lg text-base">
          Stay informed about all upcoming events and become a part of them.{" "}
        </p>
        <EventsMap
          type={"upcoming"}
          NoEventFallbackText={"There are no events published yet"}
        />
      </div>
    </SectionWrapper>
  );
};

// const UpcomingEventsMap = () => {
//   const [event, setEvent] = React.useState<Event[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [iserror, setIsError] = React.useState<boolean>(false);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/public/events?event=upcoming", {
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
//       <p className="text-lg font-bold text-my-para">
//          There are no events published yet
//       </p>
//     </div>
//   );
// };

export default UpcomingEvents;

// "use client";
// import NoEventIcon from "@/assets/icons/NoEventIcon";
// import CardCarousel from "@/components/CardCarousel";
// import Card from "@/components/CardCarousel/Card";
// import SectionWrapper from "@/components/Layout/SectionWrapper";
// import Heading from "@/components/Text/Heading";
// import { cn } from "@/utils/taliwind";
// import React from "react";

// const UpcommmingEvents = () => {
//   return (
//     // <SectionWrapper className="mt-24 mx-auto pb-12">
//     <SectionWrapper className={cn("  pb-0 pt-40")}>
//       <div className="flex flex-col gap-6">
//         <Heading variant="medium">Upcomming Events </Heading>
//         <p className="font-medium text-my-para sm:text-lg text-base">
//           Stay informed about all upcoming events and become a part of them.{" "}
//         </p>
//         {UpcomingEventssData.length === 0 ? (
//           <NoEventFallback />
//         ) : (
//           <CardCarousel>
//             {UpcomingEventssData.map((cardData, index) => (
//               <Card data={cardData} key={index}>
//                 <Card.Header>
//                   <Card.Image />
//                   {/* <Card.Category /> */}
//                 </Card.Header>
//                 <Card.Content>
//                   <Card.Title />
//                   <Card.Description />
//                   <Card.TimeAndLocation />
//                 </Card.Content>
//               </Card>
//             ))}
//           </CardCarousel>
//         )}
//       </div>
//     </SectionWrapper>
//   );
// };

// const NoEventFallback = () => {
//   return (
//     <div className="flex flex-col justify-center items-center py-16 gap-4">
//       <div className=" p-10 bg-gray-200 rounded-full grid place-content-center w-fit">
//         <NoEventIcon />
//       </div>
//       <p className="text-lg font-bold text-my-para">
//         There are no events published yet{" "}
//       </p>
//     </div>
//   );
// };

// export default UpcommmingEvents;
