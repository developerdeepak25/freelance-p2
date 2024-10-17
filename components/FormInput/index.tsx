"use client";
import React from "react";
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

export const FormInputWithLabel = ({
  name,
  label,
  ...rest
}: FormInputProps & { name: string; label: string }) => {
    // const {
    //   register,
    //   formState: { errors },
    // } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-my-para text-base font-normal">
        {label}
      </Label>
      <Input
        id={name}
        // {...register(name)}
        {...rest}
        className={cn(commonCss, "border-[1px]")}
      />
      {/* {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )} */}
    </div>
  );
};


