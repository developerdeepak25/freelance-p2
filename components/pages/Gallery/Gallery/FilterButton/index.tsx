'use client';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  isActive: boolean;

}

const FilterButton = ({ children, isActive=false, ...rest }: Props) => {
  return (
    <Button
      variant="primary-solid"
      className={cn(
        "h-8 rounded-full border-[1px] border-primary text-my-para font-medium  px-5 py-1 bg-transparent hover:text-white",
        isActive ? "border-none bg-primary text-white" : ""
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FilterButton;
