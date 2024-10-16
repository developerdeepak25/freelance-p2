"use client";
import { cn } from "@/utils/taliwind";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SectionWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn("flex justify-center mx-auto px-7   sm:px-20", className)}
    >
      <div className={`grow xl:max-w-[1280px] w-full  `}>{children}</div>
    </div>
  );
};

export default SectionWrapper;
