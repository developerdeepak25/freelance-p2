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
import { CardDataType } from "@/components/CardCarousel/Card";

type EventFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  dateRange: DateRange | undefined;
  venue: string;
  highlights?: string;
};


type EditEventModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData: CardDataType;
};

const EditEventModal = ({
  isModalOpen,
  setIsModalOpen,
  editData,
}: EditEventModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    defaultValues: {
      title: editData.title,
      description: editData.description,
      venue: editData.venue || "",
      highlights: editData.highlights || "",
      thumbnail: editData.thumbnail,
      dateRange: {
        from: new Date(editData.startDate),
        to: editData.endDate ? new Date(editData.endDate) : undefined,
      },
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    const formData = new FormData();

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

    try {
      const res = await axios.put(`/api/events/${editData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error updating event");
        return;
      }
      toast.success("Event updated successfully");
      setIsModalOpen(false);
    } catch (error) {
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

  return (
    <FormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Edit Event Item"
      submitButtonText="Update Item"
    >
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        <FormInputWithLabel
          {...register("title", { required: "Title is required" })}
          id="title"
          label="Title"
          error={errors.title?.message}
        />
        <FormTextAreaWithLabel
          {...register("description", { required: "Description is required" })}
          id="description"
          label="Description"
          error={errors.description?.message}
        />
        <FormInputWithLabel
          {...register("thumbnail", { required: false })}
          id="thumbnail"
          label="Change Thumbnail"
          type="file"
          accept="image/*"
          error={errors.thumbnail?.message}
        />
        <Controller
          name="dateRange"
          control={control}
          rules={{ required: "Date range is required" }}
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
        />
        <FormInputWithLabel
          {...register("highlights", { required: false })}
          id="highlights"
          label="Highlight"
        />
        <Button disabled={isSubmitting} variant={"primary-solid"} type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}{" "}
          Update
        </Button>
      </ModalForm>
    </FormModal>
  );
};

export default EditEventModal;
