"use client";
import React, { forwardRef } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/utils/taliwind";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type FormTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const commonCss =
  "px-5 py-3 text-my-para font-bold text-base rounded-[8px] border-2 border-gray-300";
// "px-10 py-7 text-my-para font-bold text-base rounded-[40px] border-2 border-gray-300";

export const FormInput = ({ ...rest }: FormInputProps) => {
  return <Input className={commonCss} {...rest} />;
};

export const FormTextArea = ({ ...rest }: FormTextAreaProps) => {
  return <Textarea className={commonCss} {...rest} />;
};

export const FormInputWithLabel = forwardRef<
  HTMLInputElement,
  FormInputProps & { id: string; label: string; error: string | undefined }
>(({ id, label, error, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-my-para text-base font-normal">
        {label}
      </Label>
      <Input
        id={id}
        ref={ref}
        {...rest}
        className={cn(commonCss, "border-[1px]")}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

// Set display name for easier debugging
FormInputWithLabel.displayName = "FormInputWithLabel";

export const FormTextAreaWithLabel = forwardRef<
  HTMLTextAreaElement,
  FormTextAreaProps & { id: string; label: string; error: string | undefined }
>(({ id, label, error, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-my-para text-base font-normal">
        {label}
      </Label>
      <Textarea
        id={id}
        ref={ref}
        {...rest}
        className={cn(commonCss, "border-[1px]")}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

// Set display name for easier debugging
FormTextAreaWithLabel.displayName = "FormTextAreaWithLabel";
