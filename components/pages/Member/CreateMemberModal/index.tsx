import React from "react";

import SocialLinkInput, {
  DatePicker,
  FormInputWithLabel,
  platformOptions,
  SimpleSelect,
} from "@/components/FormInput";
import { FormModal, ModalForm } from "@/components/FormModel";
import { Button } from "@/components/ui/button";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
type SocialLink = {
  platform: string;
  url: string;
};

export type MemberFormValues = {
  name: string;
  email?: string;
  phoneNo?: string;
  photo?: FileList;
  panCardNo?: string;
  aadharCardNo?: string;
  dateOfBirth?: Date;
  caste?: string;
  designation: string;
  profession?: string;
  committee: string;
  socialLinks: SocialLink[];
};

const committeeOptions = [
  { value: "GENERAL", label: "General" },
  { value: "EXECUTIVE", label: "Executive" },
];

const casteOptions = [
  { value: "general", label: "General" },
  { value: "obc", label: "Obc" },
  { value: "SC", label: "Sc" },
  { value: "ST", label: "St" },
  { value: "others", label: "Others" },
];

const MemberCreateModal = ({
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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    defaultValues: {
      socialLinks: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const formValues = watch();
  // console.log("formValuse", formValues);
  const usedPlatforms =
    formValues.socialLinks?.map((link) => link.platform) || [];

  const onSubmit: SubmitHandler<MemberFormValues> = async (data) => {
    // Make your API call here

    const formData = new FormData();
    // console.log(data.photo);

    Object.entries(data).forEach(([key, value]) => {
      if (key === "socialLinks" && Array.isArray(value)) {
        // Convert the socialLinks array to a JSON string
        formData.append("socialLinks", JSON.stringify(value));
      } else if (key === "photo" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else if (key === "dateOfBirth" && value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    // console.log("filled data", data, formData);
    try {
      const res = await axios.post("/api/members", formData);
      // console.log(res);
      // console.log(res.data);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding Member");
        // console.log(res);
      }
      toast.success("Member added successfully");
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
      title="Add Member"
      // onSubmit={()=>handleSubmit(onSubmit)}
      submitButtonText="Add Item"
    >
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex gap-3 flex-col"> */}
        <FormInputWithLabel
          {...register("name", { required: "Name is required" })}
          id="name"
          label="Name"
          error={errors.name?.message}
        />
        <FormInputWithLabel
          {...register("email", {
            required: "Email is required",
          })}
          id="email"
          label="Email"
          error={errors.email?.message}
        />
        <FormInputWithLabel
          {...register("phoneNo")}
          id="phoneNo"
          label="Phone Number"
          error={errors.phoneNo?.message}
        />
        <FormInputWithLabel
          {...register("photo")}
          id="photo"
          label="Photo"
          type="file"
          accept="image/*"
        />
        <FormInputWithLabel
          {...register("panCardNo")}
          id="panCardNo"
          label="PAN Card Number"
        />
        <FormInputWithLabel
          {...register("aadharCardNo")}
          id="aadharCardNo"
          label="Aadhar Card Number"
        />
        <FormInputWithLabel
          {...register("designation", 
            // { required: "Designation is required" }
          )}
          id="designation"
          label="Designation"
          error={errors.designation?.message}
        />
        <FormInputWithLabel
          {...register("profession")}
          id="profession"
          label="Profession"
        />
        <Controller
          name="dateOfBirth"
          control={control}
          // rules={{ required: "DOB is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-my-para text-base font-normal"
              >
                Date of Birth
              </label>
              <DatePicker value={field.value} onChange={field.onChange} />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
          )}
        />{" "}
        <Controller
          name="committee"
          control={control}
          rules={{ required: "Committee is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="committee"
                className="text-my-para text-base font-normal"
              >
                Committee
              </label>
              <SimpleSelect
                options={committeeOptions}
                placeholder="Select committee"
                value={field.value}
                onValueChange={field.onChange}
              />
              {errors.committee && (
                <span className="text-red-500 text-sm">
                  {errors.committee.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="caste"
          control={control}
          // rules={{ required: "Caste is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="caste"
                className="text-my-para text-base font-normal"
              >
                Caste
              </label>
              <SimpleSelect
                options={casteOptions}
                placeholder="Select Caste"
                value={field.value ?? ""}
                onValueChange={field.onChange}
              />
              {errors.caste && (
                <span className="text-red-500 text-sm">
                  {errors.caste.message}
                </span>
              )}
            </div>
          )}
        />
        <div className="space-y-2">
          <label className="text-my-para text-base font-normal">
            Social Links
          </label>
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              name={`socialLinks.${index}`}
              control={control}
              // rules={{ required: "Social link is required" }}
              render={({ field }) => (
                <SocialLinkInput
                  index={index}
                  platform={field.value.platform}
                  url={field.value.url}
                  onPlatformChange={(index, value) =>
                    field.onChange({ ...field.value, platform: value })
                  }
                  onUrlChange={(index, value) =>
                    field.onChange({ ...field.value, url: value })
                  }
                  onRemove={() => remove(index)}
                  usedPlatforms={usedPlatforms}
                />
              )}
            />
          ))}
          {usedPlatforms.length < platformOptions.length && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ platform: "", url: "" })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Social Link
            </Button>
          )}
        </div>
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

export default MemberCreateModal;
