// "use client";
// import NoEventIcon from "@/assets/icons/NoEventIcon";
// import CardCarousel from "@/components/CardCarousel";
// import Card from "@/components/CardCarousel/Card";
// import SectionWrapper from "@/components/Layout/SectionWrapper";
// import Heading from "@/components/Text/Heading";
// import React from "react";

// const UpcommmingEvents = () => {
//   return (
//     // <SectionWrapper className="mt-24 mx-auto pb-12">
//     <SectionWrapper className={"mt-20  pb-12"}>
//       <div className="flex flex-col gap-6">
//         <Heading variant="medium">
//           Upcomming Events{" "}
//         </Heading>
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
//                   <Card.Category />
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

// import React from "react";
// import UpcomingEventss from "@/components/pages/Events/UpcomingEventss";

// export const HomeUpcomingEventss = () => {
//   return <UpcomingEventss />;
// };
