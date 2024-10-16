"use client";
import React from "react";
import { Button } from "../ui/button";

interface Props extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

const FormButton = ({ children, ...rest }: Props) => {
  return (
    <Button
      variant="primary-solid"
      {...rest}
      className="py-7 px-10 rounded-[40px]"
    >
      {children}
    </Button>
  );
};

export default FormButton;
