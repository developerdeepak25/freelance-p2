"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddButton } from "@/components/buttons/ModifiedButton";
import {
  FormInputWithLabel,
  FormTextAreaWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import GalleryEvents from "@/components/pages/Gallery/GalleryEvents";

interface FormValues {
  images: FileList;
  title: string;
  description: string;
  driveLink: string;
}

const AdminGallery: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    console.log(errors.root?.message);
    console.log(errors.title?.message);
    console.log(errors.description?.message);
    console.log(errors.images?.message);
    console.log(errors.driveLink?.message);
  }, [errors]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Make your API call here

    const formData = new FormData();
    console.log(data.images);

    Array.from(data.images).forEach((image: File) => {
      formData.append(`images`, image); // `images` is the key expected by the backend
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("driveLink", data.driveLink);

    console.log(data);
    try {
      const res = await axios.post("/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      console.log(res.data);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding gallery item");
        console.log(res);
      }
      toast.success("Gallery item added successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error adding gallery item");
      console.log(error);
    }
  };

  return (
    <SectionWrapper className="pt-40 pb-40">
      <div className="flex justify-between items-center gap-3 pb-10">
        <Heading variant="medium" className="text-center">
          Admin Gallery
        </Heading>
        <AddButton onClick={() => setIsModalOpen(true)}>Add</AddButton>
      </div>
      <div className="mt-10 flex flex-col items-center gap-20">
        {/* {gallery.length === 0 ? (
          <Heading variant="medium">Nothing to show</Heading>
        ) : (
          gallery.map((item, index) => (
            <GalleryEvent
              key={index}
              title={item.title}
              desc={item.description}
              images={item.images}
              seeMore={item.seeMore}
            />
          ))
        )} */}
        <GalleryEvents />
      </div>
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
            {...register("images", { required: "Images are required" })}
            id="images"
            label="Images"
            type="file"
            multiple
            error={errors.images?.message}
          />
          <Button
            disabled={isSubmitting}
            variant={"primary-solid"}
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}{" "}
            Submit
          </Button>
          {/* </div> */}
        </ModalForm>
      </FormModal>
    </SectionWrapper>
  );
};

export default AdminGallery;
