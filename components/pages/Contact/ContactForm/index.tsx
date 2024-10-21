"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { FormInput, FormTextArea } from "@/components/FormInput";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OtherDetails = [
  {
    type: "Address",
    value: ["18, Cleark Colony, Gori Nagar, Rajwada, Jaipur"],
  },
  {
    type: "Phone",
    value: ["+99 665125154541", "+99 995125154541"],
  },
  {
    type: "Email",
    value: ["ngo.abc123@gmail.com", "xyz123@gmail.com"],
  },
];

type FormValues = {
  subject: string;
  description: string;
  fullName: string;
  email: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Make the API request
    const res =  await axios.post("/api/public/send-mail", {
        subject: data.subject,
        description: data.description,
        fullName: data.fullName,
        userEmail: data.email,
      });
      if (res.status !== 200 && res.status !== 201) {
        return toast.error("Error sending email");
      }
      toast.success("Email sent successfully!");
      reset(); // Reset the form
    } catch (error) {
      console.error("Failed to send email", error);
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
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <SectionWrapper className="pt-40 sm:pb-20 max-sm:px-0">
      <div className="w-full sm:rounded-2xl sm:border-[1px] border-gray-300 flex xl:flex-row flex-col">
        {/* form */}
        <div className="w-full py-12 px-5 sm:px-11 flex flex-col gap-10">
          <div className="pl-3">
            <Heading variant="medium">Get in touch.</Heading>
            <p className="font-normal text-base text-my-para">
              Share your thoughts, we would love to hear them.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex gap-5 md:flex-row flex-col justify-stretch">
              <FormInput
                placeholder="FullName"
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                error={errors.fullName?.message}
                wrapperClassName="grow"
              />
              <FormInput
                wrapperClassName="grow"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                error={errors.email?.message}
              />
            </div>
            <FormInput
              placeholder="Subject"
              type="text"
              {...register("subject", { required: "Subject is required" })}
              error={errors.subject?.message}
            />
            <FormTextArea
              placeholder="Description"
              rows={10}
              {...register("description", {
                required: "Description is required",
              })}
              error={errors.description?.message}
            />
            <div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {"Submit"}
              </Button>
            </div>
          </form>
        </div>

        {/* details and links part */}
        <div className="bg-[#F7F4F2] xl:px-28 px-10">
          <div className="xl:flex xl:flex-col grid lg:grid-cols-4 md:grid-cols-2 gap-12 py-20 items-center justify-center h-full">
            {OtherDetails.map((item, index) => (
              <div className="flex flex-col items-center" key={index}>
                <div className="font-bold text-[18px] capitalize text-center">
                  {item.type}
                </div>
                {item.value.map((value, index) => (
                  <p
                    className="font-normal text-base text-my-para text-center"
                    key={index}
                  >
                    {value}
                  </p>
                ))}
              </div>
            ))}

            {/* social links */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-[18px] capitalize text-center">
                Social
              </div>
              <p className="font-normal text-base text-my-para text-center underline">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </p>
              <p className="font-normal text-base text-my-para text-center underline">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactForm;
