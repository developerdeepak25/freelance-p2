'use client';
import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type FormTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const commonCss =
  "px-10 py-7 text-my-para font-bold text-base rounded-[40px] border-2 border-gray-300";

export const FormInput = ({ ...rest }: FormInputProps) => {
  return <Input className={commonCss} {...rest} />;
};

export const FormTextArea = ({ ...rest }: FormTextAreaProps) => {
  return <Textarea className={commonCss} {...rest} />;
};



