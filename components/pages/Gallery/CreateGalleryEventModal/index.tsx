import {
  FormInputWithLabel,
  FormTextAreaWithLabel,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  images: FileList;
  title: string;
  description: string;
  driveLink: string;
}

const CreateGalleryEventModal = ({
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
  } = useForm<FormValues>();

  //  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Make your API call here

    const formData = new FormData();

    Array.from(data.images).forEach((image: File) => {
      formData.append(`images`, image); // `images` is the key expected by the backend
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("driveLink", data.driveLink);

    try {
      const res = await axios.post("/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding gallery item");
      }
      toast.success("Gallery item added successfully");
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
          accept="image/*"
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

export default CreateGalleryEventModal;
