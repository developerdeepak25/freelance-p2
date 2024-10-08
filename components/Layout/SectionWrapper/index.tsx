"use client";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SectionWrapper = ({ children, className }: Props) => {
  return (
    <div className={cn("flex justify-center mx-auto ", className)}>
      <div className={cn(`grow max-w-[1280px]  mx-20 `)}>{children}</div>
    </div>
  );
};

export default SectionWrapper;
