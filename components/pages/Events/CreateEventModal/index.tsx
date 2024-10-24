import React from "react";

import {
  DateRangePicker,
  FormInputWithLabel,
  FormTextAreaWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";

type EventFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  //   cloudinaryThumbnailId: string;
  // date: Date;
  //   startDate: Date;
  //   endDate: Date;
  dateRange: DateRange | undefined;

  // time: string;
  venue: string;
  //   eventGalleryLink?: string;
  highlights?: string; // will be a link
};
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
    // watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>();

  // const formValues = watch();

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    // Make your API call here

    const formData = new FormData();

    // Dynamically add fields to FormData
    Object.entries(data).forEach(([key, value]) => {

      if (value !== undefined && value !== null) {
        if (key === "dateRange" && typeof value !== "string") {
          if (value.from)
            formData.append("startDate", value.from.toISOString());
          if (value.to) formData.append("endDate", value.to.toISOString());
        } else if (value instanceof FileList) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // console.log("filled data", data, formData);
    try {
      const res = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      // console.log(res.data);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding Event");
        // console.log(res);
      }
      toast.success("Event added successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          const errMessage = error.response?.data?.error;
          // console.log(errMessage);
          if (errMessage) {
            return toast.error(errMessage);
          }
        }
      }
      toast.error("something went wrong");
    }
  };

  return (
    <FormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Add Event Item"
      // onSubmit={()=>handleSubmit(onSubmit)}
      submitButtonText="Add Item"
    >
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex gap-3 flex-col"> */}
        <FormInputWithLabel
          {...register("title", { required: "Title is required" })}
          id="title"
          label="Title"
          error={errors.title?.message}
        />
        <FormTextAreaWithLabel
          {...register("description", {
            required: "Description is required",
          })}
          id="description"
          label="Description"
          error={errors.description?.message}
        />

        <FormInputWithLabel
          {...register("thumbnail", { required: "Thumbnail are required" })}
          id="images"
          label="Images"
          type="file"
          accept="image/*"
          error={errors.thumbnail?.message}
        />
        <Controller
          name="dateRange"
          control={control}
          rules={{ required: "Date range is required" }}
          render={({ field }) => (
            <div className="  flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-my-para text-base font-normal"
              >
                Event Date Range
              </label>
              <DateRangePicker value={field.value} onChange={field.onChange} />
              {errors.dateRange && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateRange.message}
                </p>
              )}
            </div>
          )}
        />

        <FormInputWithLabel
          {...register("venue", { required: false })}
          id="venue"
          label="Venue"
          //   error={errors.venue?.message}
        />

        <FormInputWithLabel
          {...register("highlights", { required: false })}
          id="highlight"
          label="Highlight"
          //   error={errors.highlights?.message}
        />

        <Button disabled={isSubmitting} variant={"primary-solid"} type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}{" "}
          Submit
        </Button>
        {/* </div> */}
      </ModalForm>
    </FormModal>
  );
};

export default CreateEventModal;
