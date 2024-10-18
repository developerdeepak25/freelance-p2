"use client";
import React, { forwardRef } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/utils/taliwind";
import {  format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";

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
  FormInputProps & { id: string; label: string; error?: string | undefined }
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






export function DateRangePicker({
  className,
  value,
  onChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}