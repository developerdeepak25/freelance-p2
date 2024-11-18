// "use client";
// // components/layout/HeroWrapperWithImageAndGradient.tsx
// import React, { ReactNode } from "react";
// import Image from "next/image";
// import { cn } from "@/utils/taliwind";

// interface HeroWrapperWithImageAndGradientProps {
//   children: ReactNode;
//   backgroundImage: string;
//   altText: string;
//   className?: string;
// }

// const HeroWrapperWithImageAndGradient = ({
//   children,
//   backgroundImage,
//   altText,
//   className,
// }: HeroWrapperWithImageAndGradientProps) => {
//   return (
//     <div
//       className={cn(
//         "w-screen h-[780px] relative overflow-hidden flex justify-center",
//         className
//       )}
//     >
//       {/* Hero overlay and image */}
//       <div className="absolute top-0 left-0 right-0 w-full h-full z-0">
//         <Image
//           src={backgroundImage}
//           alt={altText}
//           fill={true}
//           className="object-cover object-center"
//         />
//         {/* Gradient overlay */}
//         <div className="bg-hero-gradient absolute top-0 left-0 right-0 w-full h-full"></div>
//       </div>
//       {/* Children content */}
//       <div className="z-10">{children}</div>
//     </div>
//   );
// };

// export default HeroWrapperWithImageAndGradient;

"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/taliwind";

interface HeroWrapperWithCarouselProps {
  children: ReactNode;
  // images: Array<{
  //   url: string;
  //   alt: string;
  // }>;
  images: string[];
  interval?: number; // Time in milliseconds between transitions
  className?: string;
}

const HeroWrapperWithCarousel = ({
  children,
  images,
  interval = 5000, // Default 5 seconds
  className,
}: HeroWrapperWithCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div
      className={cn(
        "w-screen h-[780px] relative overflow-hidden flex justify-center",
        className
      )}
    >
      Current Image
      {images.map((image, index) => {
        return (
          <div
            className={cn(
              "absolute top-0 left-0 right-0 w-full h-full z-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
            key={index}
          >
            <Image
              src={image}
              alt={"hero carosoul image"}
              // alt={images[nextImageIndex].alt}
              fill={true}
              className="object-cover object-center"
              priority
            />
          </div>
        );
      })}
      {/* Gradient overlay */}
      <div className="bg-hero-gradient absolute top-0 left-0 right-0 w-full h-full z-[1]"></div>
      {/* Children content */}
      <div className="z-10">{children}</div>
    </div>
  );
};

export default HeroWrapperWithCarousel;
