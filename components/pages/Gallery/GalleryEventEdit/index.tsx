import {
  FormInputWithLabel,
  FormTextAreaWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GalleryEventProps } from "../GalleryEvent";
import axios from "axios";
import { toast } from "sonner";

interface FormValues {
  images: FileList;
  title: string;
  description: string;
  driveLink: string;
}
type GalleryEventEditProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  editData: GalleryEventProps;
};
const GalleryEventEdit = ({
  setIsModalOpen,
  isModalOpen,
  editData,
}: GalleryEventEditProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: editData.title,
      description: editData.desc,
      driveLink: editData.seeMore,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    Array.from(data.images).forEach((image: File) => {
      formData.append(`images`, image); // `images` is the key expected by the backend
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("driveLink", data.driveLink);

    console.log(data);
    try {
      const res = await axios.put(`/api/gallery/${editData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      console.log(res.data);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error editing gallery item");
        console.log(res);
      }
      toast.success("Gallery item edited successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error editing gallery item");
      console.log(error);
    }
  };

  return (
    <FormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Add Gallery Item"
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
          {...register("driveLink", { required: false })}
          id="driveLink"
          label="G-Drive Link"
          error={errors.driveLink?.message}
        />
        <FormInputWithLabel
          {...register("images", { required: false })}
          id="images"
          label="Images"
          type="file"
          multiple
          error={errors.images?.message}
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

export default GalleryEventEdit;
