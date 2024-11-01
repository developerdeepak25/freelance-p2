"use client";
import React, {
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/utils/taliwind";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Trash2 } from "lucide-react";
// import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type FormTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const commonCss =
  "px-5 py-3 text-my-para font-bold text-base rounded-[8px] border-2 border-gray-300";
// "px-10 py-7 text-my-para font-bold text-base rounded-[40px] border-2 border-gray-300";

export const FormInput = forwardRef<
  HTMLInputElement,
  FormInputProps & { error?: string; wrapperClassName?: string }
>(({ error, wrapperClassName, ...rest }, ref) => {
  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <Input ref={ref} className={commonCss} {...rest} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

// Set display name for debugging
FormInput.displayName = "FormInput";

// Basic FormTextArea Component
export const FormTextArea = forwardRef<
  HTMLTextAreaElement,
  FormTextAreaProps & { error?: string; wrapperClassName?: string }
>(({ error, wrapperClassName, ...rest }, ref) => {
  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <Textarea ref={ref} className={commonCss} {...rest} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

// Set display name for debugging
FormTextArea.displayName = "FormTextArea";

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
  FormTextAreaProps & { id: string; label: string; error?: string | undefined }
>(({ id, label, error, className, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-my-para text-base font-normal">
        {label}
      </Label>
      <Textarea
        id={id}
        ref={ref}
        {...rest}
        className={cn(commonCss, "border-[1px]", className)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

// Set display name for easier debugging
FormTextAreaWithLabel.displayName = "FormTextAreaWithLabel";

export const AutoResizeFormTextAreaWithLabel = forwardRef<
  HTMLTextAreaElement,
  FormTextAreaProps & { id: string; label: string; error?: string | undefined }
>(({ id, label, error, className, ...rest }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-my-para text-base font-normal">
        {label}
      </Label>
      <Textarea
        id={id}
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...rest}
        onChange={handleChange}
        className={cn(
          commonCss,
          "min-h-[100px] h-auto overflow-hidden",
          className
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

// Set display name for easier debugging
AutoResizeFormTextAreaWithLabel.displayName = "AutoResizeFormTextAreaWithLabel";

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
            // className={cn(
            // "w-full justify-start text-left font-normal",
            // !value && "text-muted-foreground"
            // )}
            className={cn(commonCss, "border-[1px] px-5 justify-start")}
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

export function DatePicker({
  className,
  value,
  onChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("border-[1px] px-5 justify-start")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "LLL dd, y") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface Option {
  value: string;
  label: string;
}

interface SimpleSelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function SimpleSelect({
  options,
  placeholder = "Select an option",
  className,
  value,
  onValueChange,
}: SimpleSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn("border-[1px] px-5 justify-start", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const platformOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  // { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  // Add more platforms as needed
];

interface SocialLinkInputProps {
  index: number;
  platform: string;
  url: string;
  onPlatformChange: (index: number, value: string) => void;
  onUrlChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  usedPlatforms: string[];
  error?: string;
}

const SocialLinkInput: React.FC<SocialLinkInputProps> = ({
  index,
  platform,
  url,
  onPlatformChange,
  onUrlChange,
  onRemove,
  usedPlatforms,
  // error
}) => {
  const availablePlatforms = platformOptions.filter(
    (option) =>
      !usedPlatforms.includes(option.value) || option.value === platform
  );

  return (
    <div className="flex items-center space-x-2">
      <SimpleSelect
        options={availablePlatforms}
        placeholder="Select Platform"
        value={platform}
        onValueChange={(value) => onPlatformChange(index, value)}
      />
      <Input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => onUrlChange(index, e.target.value)}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SocialLinkInput;
