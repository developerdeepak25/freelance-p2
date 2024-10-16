"use client";
import React from "react";

interface InstagramIconProps extends React.SVGProps<SVGSVGElement> {
//   width?: number;
  height?: number;
  color?: string;
}

const InstagramIcon: React.FC<InstagramIconProps> = ({
//   width,
  height = 24,
  ...props
}) => {
  return (
    <svg
    //   width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      
        <path
          d="M15 3.5H9C5.96243 3.5 3.5 5.96243 3.5 9V15C3.5 18.0376 5.96243 20.5 9 20.5H15C18.0376 20.5 20.5 18.0376 20.5 15V9C20.5 5.96243 18.0376 3.5 15 3.5Z"
          stroke="#5B5B5B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.9996 15.6056C13.9911 15.6056 15.6056 13.9911 15.6056 11.9996C15.6056 10.008 13.9911 8.39355 11.9996 8.39355C10.008 8.39355 8.39355 10.008 8.39355 11.9996C8.39355 13.9911 10.008 15.6056 11.9996 15.6056Z"
          stroke="#5B5B5B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.8943 8.13617C17.4631 8.13617 17.9243 7.67502 17.9243 7.10617C17.9243 6.53732 17.4631 6.07617 16.8943 6.07617C16.3254 6.07617 15.8643 6.53732 15.8643 7.10617C15.8643 7.67502 16.3254 8.13617 16.8943 8.13617Z"
          fill="#5B5B5B"
        />
      </svg>
  );
};

export default InstagramIcon;
