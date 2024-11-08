"use client";
import React from "react";

interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number; // Optional prop for width
  height?: number; // Optional prop for height
  color?: string; // Optional prop for fill color
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  width,
  height = 12,
  color = 'black',
  ...props // Spread the remaining SVG props
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 12"
      {...props} // Apply any additional SVG props passed to the component
    >
      <path
        d="M19.4982 6.52654C19.789 6.2513 19.8016 5.79243 19.5264 5.50162L15.041 0.76274C14.7658 0.471938 14.3069 0.459327 14.0161 0.734572C13.7253 1.00982 13.7127 1.46869 13.9879 1.75949L17.9749 5.97183L13.7626 9.95883C13.4718 10.2341 13.4592 10.693 13.7344 10.9838C14.0097 11.2746 14.4685 11.2872 14.7593 11.0119L19.4982 6.52654ZM0.786723 6.22473L18.9799 6.72473L19.0198 5.27527L0.826558 4.77527L0.786723 6.22473Z"
        fill={color}
        fillOpacity="1"
      />
    </svg>
  );
};

export default ArrowIcon;
