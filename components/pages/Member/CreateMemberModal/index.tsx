import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { MemberFormValues, memberSchema } from "@/schema/memberSchema";
import { CASTEOPTIONS, COMMITTEEOPTIONS } from "@/utils/constant";
import { getFutureTimestamp } from "@/utils/other";

// const committeeOptions = [
//   { value: "GENERAL", label: "General" },
//   { value: "EXECUTIVE", label: "Executive" },
// ];

// const casteOptions = [
//   { value: "general", label: "General" },
//   { value: "obc", label: "Obc" },
//   { value: "SC", label: "Sc" },
//   { value: "ST", label: "St" },
//   { value: "MBC", label: "MBC" },
//   // { value: "others", label: "Others" },
// ];

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
    resolver: zodResolver(memberSchema),
    defaultValues: {
      socialLinks: [],
      memberShip: '1'
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const formValues = watch();
  const usedPlatforms =
    formValues.socialLinks?.map((link) => link.platform) || [];

  const onSubmit: SubmitHandler<MemberFormValues> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "socialLinks" && Array.isArray(value)) {
        formData.append("socialLinks", JSON.stringify(value));
      } else if (key === "photo" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else if (key === "dateOfBirth" && value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (key === "memberShip" && typeof value === "string") {
        // console.log("valus got for membership field", value, key);
        //  if value is lifeTIme we will send a fiedl name isMemberShipLifeTime as true to server
        if (value === "lifeTime") {
          formData.append("isMemberShipLifeTime", JSON.stringify(true));
        } else {
          // if it is number of years we will futre timstamp from current time
          const yearstamp = getFutureTimestamp(value);
          console.log("yearstamp", yearstamp, key);
          formData.append("memberShipExpiresAt", String(yearstamp));
        }
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    try {
      const res = await axios.post("/api/members", formData);

      if (res.status !== 200 && res.status !== 201) {
        toast.error("Error adding Member");
      }
      toast.success("Member added successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
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
      title="Add Member"
      submitButtonText="Add Item"
    >
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        <FormInputWithLabel
          {...register("name")}
          id="name"
          label="Name"
          error={errors.name?.message}
        />
        <FormInputWithLabel
          {...register("email")}
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
          error={errors.photo?.message}
        />
        <FormInputWithLabel
          {...register("panCardNo")}
          id="panCardNo"
          label="PAN Card Number"
          error={errors.panCardNo?.message}
        />
        <FormInputWithLabel
          {...register("aadharCardNo")}
          id="aadharCardNo"
          label="Aadhar Card Number"
          error={errors.aadharCardNo?.message}
        />
        <FormInputWithLabel
          {...register("janAadharCardNo")}
          id="janAadharCardNo"
          label="Jan Aadhar Card Number"
          error={errors.janAadharCardNo?.message}
        />
        <FormInputWithLabel
          {...register("designation")}
          id="designation"
          label="Designation"
          error={errors.designation?.message}
        />
        <FormInputWithLabel
          {...register("profession")}
          id="profession"
          label="Profession"
          error={errors.profession?.message}
        />
        <Controller
          name="dateOfBirth"
          control={control}
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
        />
        <Controller
          name="committee"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="committee"
                className="text-my-para text-base font-normal"
              >
                Committee
              </label>
              <SimpleSelect
                options={COMMITTEEOPTIONS}
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
          name="memberShip"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="memberShip"
                className="text-my-para text-base font-normal"
              >
                Membership (in year)
              </label>
              <SimpleSelect
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "lifeTime", label: "Life time" },
                ]}
                placeholder="Select Membership"
                value={field.value}
                onValueChange={field.onChange}
                // defaultValue="1"
              />
              {errors.memberShip && (
                <span className="text-red-500 text-sm">
                  {errors.memberShip.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="caste"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="caste"
                className="text-my-para text-base font-normal"
              >
                Caste
              </label>
              <SimpleSelect
                options={CASTEOPTIONS}
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
              name={`socialLinks.${index}` as const}
              control={control}
              render={({ field: socialField }) => (
                <SocialLinkInput
                  index={index}
                  platform={socialField.value.platform}
                  url={socialField.value.url}
                  onPlatformChange={(index, value) =>
                    socialField.onChange({
                      ...socialField.value,
                      platform: value,
                    })
                  }
                  onUrlChange={(index, value) =>
                    socialField.onChange({
                      ...socialField.value,
                      url: value,
                    })
                  }
                  onRemove={() => remove(index)}
                  usedPlatforms={usedPlatforms}
                  error={
                    errors.socialLinks?.[index]?.platform?.message ||
                    errors.socialLinks?.[index]?.url?.message
                  }
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
          {errors.socialLinks && (
            <span className="text-red-500 text-sm">
              {errors.socialLinks.message}
            </span>
          )}
        </div>
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

export default MemberCreateModal;
