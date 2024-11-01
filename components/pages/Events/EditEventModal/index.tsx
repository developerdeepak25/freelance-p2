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
// import { DateRange } from "react-day-picker";
import { CardDataType } from "@/components/CardCarousel/Card";
import { EditEventFormValues, editEventSchema } from "@/schema/eventSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
  } = useForm<EditEventFormValues>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: editData.title,
      description: editData.description,
      venue: editData.venue || "",
      highlights: editData.highlights || "",
      dateRange: {
        from: new Date(editData.startDate),
        to: editData.endDate ? new Date(editData.endDate) : undefined,
      },
    },
  });

  const onSubmit: SubmitHandler<EditEventFormValues> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else if (
          key === "dateRange" &&
          typeof value !== "string" &&
          !(value instanceof FileList)
        ) {
          if (value.from) {
            formData.append("startDate", value.from.toISOString());
          }
          if (value.to) {
            formData.append("endDate", value.to.toISOString());
          }
        } else if (!(value instanceof FileList)) {
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
        if (error.response?.status === 400) {
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
      title="Edit Event"
      submitButtonText="Update Item"
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
          id="thumbnail"
          label="Change Thumbnail"
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
          id="highlights"
          label="Highlight"
          error={errors.highlights?.message}
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
