import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "../ui/skeleton";

// interface ImageWithSkeletonProps {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
//   className?: string;
//   priority?: boolean;
// }

const ImageWithSkeleton: React.FC<ImageProps> = ({
  alt,
  className,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      {/* Skeleton */}
      {isLoading && <Skeleton className={ "absolute top-0 left-0 h-full w-full  bg-gray-200"}  />}

      {/* Image */}
      <Image
        alt={alt}
        className={` transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`.trim()}
        onLoadingComplete={() => setIsLoading(false)}
        {...rest}
      />
    </>
  );
};

export default ImageWithSkeleton;
