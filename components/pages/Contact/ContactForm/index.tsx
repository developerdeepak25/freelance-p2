"use client";
import { FormInput, FormTextArea } from "@/components/FormInput";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import { Button } from "@/components/ui/button";
import React from "react";

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
// {
//   type: "Socials",
//   value: {
//     Twitter: "https://twitter.com",
//     Facebook: "https://facebook.com",
//   },
// },

const ContactForm = () => {
  return (
    <SectionWrapper className="pt-40 sm:pb-20 max-sm:px-0">
      <div className="  w-full sm:rounded-2xl sm:border-[1px] border-gray-300 flex xl:flex-row flex-col">
        {/* form */}
        <div className=" w-full py-12 px-5 sm:px-11 flex flex-col gap-10">
          <div className="pl-3">
            <Heading variant="medium">Get in touch.</Heading>
            <p className="font-normal text-base text-my-para">
              Share your thoughts we would love to hear them.
            </p>
          </div>
          <div className="flex gap-5 md:flex-row flex-col">
            <FormInput placeholder="FullName" type="text" />
            <FormInput placeholder="Email" type="email" />
          </div>
          <FormInput placeholder="Subject" type="text" />
          <FormTextArea placeholder="Description" rows={10} />
          <div>
            {/* <FormButton>Submit</FormButton> */}
            <Button>Submit</Button>
          </div>
        </div>

        {/* details,  and links part */}

        <div className=" bg-[#F7F4F2] xl:px-28 px-10    ">
          <div className="xl:flex xl:flex-col grid lg:grid-cols-4 md:grid-cols-2 gap-12 py-20 items-center justify-center h-full">
            {OtherDetails.map((item, index) => (
              <div className="flex flex-col  items-center" key={index}>
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
            <div className="flex flex-col  items-center">
              <div className="font-bold text-[18px] capitalize text-center">
                Social
              </div>
              <p className="font-normal text-base text-my-para text-center underline">
                <a href="">Twitter</a>
              </p>
              <p className="font-normal text-base text-my-para text-center underline">
                <a href="">Facebook</a>
              </p>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactForm;
