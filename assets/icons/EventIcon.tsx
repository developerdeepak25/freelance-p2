"use client";
import React from "react";

interface EventIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

const EventIcon: React.FC<EventIconProps> = ({
  width,
  height = 151,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 151 150"
      fill="none"
      {...props}
    >
      <path
        d="M131.917 106.25V50H44.417V106.25H131.917ZM131.917 18.75C135.232 18.75 138.412 20.067 140.756 22.4112C143.1 24.7554 144.417 27.9348 144.417 31.25V106.25C144.417 109.565 143.1 112.745 140.756 115.089C138.412 117.433 135.232 118.75 131.917 118.75H44.417C41.1018 118.75 37.9224 117.433 35.5782 115.089C33.234 112.745 31.917 109.565 31.917 106.25V31.25C31.917 27.9348 33.234 24.7554 35.5782 22.4112C37.9224 20.067 41.1018 18.75 44.417 18.75H50.667V6.25H63.167V18.75H113.167V6.25H125.667V18.75H131.917ZM19.417 131.25H106.917V143.75H19.417C16.1018 143.75 12.9224 142.433 10.5782 140.089C8.23395 137.745 6.91699 134.565 6.91699 131.25V56.25H19.417V131.25ZM119.417 93.75H94.417V68.75H119.417V93.75Z"
        fill="#626262"
      />
    </svg>
  );
};

export default EventIcon;
