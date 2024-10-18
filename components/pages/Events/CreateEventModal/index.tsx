import React from "react";

import {
  FormInputWithLabel,
  FormTextAreaWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type EventFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  //   cloudinaryThumbnailId: string;
  // date: Date;
  startDate: Date;
  endDate: Date;
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
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>();

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    // Make your API call here

    const formData = new FormData();
    console.log(data.thumbnail);

    // Dynamically add fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      // Check if the value is not undefined or null before adding
      if (value !== undefined && value !== null) {
        // Convert Date to string for FormData if necessary
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value);
        }
      }
    });
    console.log("filled data", data);
    try {
      const res = await axios.post("/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      console.log(res.data);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding Event");
        console.log(res);
      }
      toast.success("Event added successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          const errMessage = error.response?.data?.error;
          console.log(errMessage);
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
            required: false,
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
