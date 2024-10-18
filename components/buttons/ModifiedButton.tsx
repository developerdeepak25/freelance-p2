import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

export const AddButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      variant={"primary-solid"}
      className=" rounded-lg"
      size={"sm"}
      {...rest}
    >
      {children} <Plus className="ml-1 h-5 " strokeWidth={3} />
    </Button>
  );
};

export const EditButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button variant="primary-solid" size={"sm"} {...rest}>
      <Pencil className="h-5" />
    </Button>
  );
};
export const DeteteButton = ({
  variant = "destructive",
  isLoading = false,
  ...rest
}: ButtonProps & { isLoading?: boolean }) => {
  return (
    <Button variant={variant} size={"sm"} {...rest}>
      {isLoading ? (
        <Loader2 className="h-5 aspect-square animate-spin" />
      ) : (
        <Trash2 className="h-5" />
      )}
    </Button>
  );
};
