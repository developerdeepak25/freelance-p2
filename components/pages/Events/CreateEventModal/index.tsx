import React from "react";

import {
  AutoResizeFormTextAreaWithLabel,
  DateRangePicker,
  FormInputWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, EditEventFormValues } from "@/schema/eventSchema";

const CreateEventModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditEventFormValues>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit: SubmitHandler<EditEventFormValues> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof FileList) {
          formData.append(key, value[0]);
        } else if (key === "dateRange" && typeof value !== "string") {
          if (value.from)
            formData.append("startDate", value.from.toISOString());
          if (value.to) formData.append("endDate", value.to.toISOString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    try {
      const res = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding Event");
      }
      toast.success("Event added successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          const errMessage = error.response?.data?.error;
          if (errMessage) {
            return toast.error(errMessage);
          }
        }
      }
      toast.error("Something went wrong");
    }
  };

  // Rest of your component remains the same
  return (
    <FormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Add Event"
      submitButtonText="Add Item"
    >
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        <FormInputWithLabel
          {...register("title")}
          id="title"
          label="Title"
          error={errors.title?.message}
        />

        <AutoResizeFormTextAreaWithLabel
          {...register("description")}
          id="description"
          label="Description"
          error={errors.description?.message}
        />

        <FormInputWithLabel
          {...register("thumbnail")}
          id="images"
          label="Images"
          type="file"
          accept="image/*"
          error={errors.thumbnail?.message}
        />

        <Controller
          name="dateRange"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-my-para text-base font-normal"
              >
                Event Date Range
              </label>
              <DateRangePicker value={field.value} onChange={field.onChange} />
              {errors.dateRange && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateRange?.message ||
                    errors.dateRange?.from?.message ||
                    errors.dateRange?.to?.message}
                </p>
              )}
            </div>
          )}
        />

        <FormInputWithLabel
          {...register("venue")}
          id="venue"
          label="Venue"
          error={errors.venue?.message}
        />

        <FormInputWithLabel
          {...register("highlights")}
          id="highlight"
          label="Highlight"
          error={errors.highlights?.message}
        />

        <Button disabled={isSubmitting} variant={"primary-solid"} type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}{" "}
          Submit
        </Button>
      </ModalForm>
    </FormModal>
  );
};

export default CreateEventModal;
