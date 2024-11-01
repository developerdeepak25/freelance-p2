import {
  AutoResizeFormTextAreaWithLabel,
  FormInputWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GalleryEventProps } from "../GalleryEvent";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  EditGalleryEventFormValues,
  editGalleryEventSchema,
} from "@/schema/gallerySchema";
import { zodResolver } from "@hookform/resolvers/zod";

type EditGalleryEventModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  editData: GalleryEventProps;
};

const EditGalleryEventModal = ({
  setIsModalOpen,
  isModalOpen,
  editData,
}: EditGalleryEventModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditGalleryEventFormValues>({
    resolver: zodResolver(editGalleryEventSchema),
    defaultValues: {
      title: editData.title,
      description: editData.desc,
      driveLink: editData.seeMore,
    },
  });

  const onSubmit: SubmitHandler<EditGalleryEventFormValues> = async (data) => {
    const formData = new FormData();

    if (data.images instanceof FileList) {
      Array.from(data.images).forEach((image: File) => {
        formData.append(`images`, image); // `images` is the key expected by the backend
      });
    }
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (!(value instanceof FileList || key === "images")) {
          formData.append(key, value);
        }
      }
    });

    try {
      const res = await axios.put(`/api/gallery/${editData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      // console.log(res.data);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error editing gallery item");
        // console.log(res);
      }
      toast.success("Gallery item edited successfully");
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
      title="Edit Gallery Event"
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
        <AutoResizeFormTextAreaWithLabel
          {...register("description", {
            required: false,
          })}
          id="description"
          label="Description"
          error={errors.description?.message}
        />
        <FormInputWithLabel
          {...register("driveLink", { required: false })}
          id="driveLink"
          label="G-Drive Link"
          error={errors.driveLink?.message}
        />
        <FormInputWithLabel
          {...register("images", { required: false })}
          id="images"
          label="Add More Images"
          type="file"
          multiple
          error={errors.images?.message}
        />
        <Button disabled={isSubmitting} variant={"primary-solid"} type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 aspect-square animate-spin" />
          ) : null}{" "}
          Update
        </Button>
        {/* </div> */}
      </ModalForm>
    </FormModal>
  );
};

export default EditGalleryEventModal;
