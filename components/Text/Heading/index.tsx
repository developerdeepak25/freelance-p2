"use client";
import React from "react";
import { cn } from "@/utils/taliwind"; // Adjust this import path as needed

type HeadingProps = {
  variant: "large" | "medium" | "small";
  children: React.ReactNode;
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({ variant, children, className }) => {
  return (
    <h1
      className={cn(
        "font-bold text-my-heading",
        {
          "md:text-5xl text-4xl": variant === "large",
          "md:text-4xl text-3xl": variant === "medium",
          "text-2xl": variant === "small",
        },
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading;
