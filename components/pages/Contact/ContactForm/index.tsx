"use client";
import FormButton from "@/components/FormButton";
import { FormInput, FormTextArea } from "@/components/FormInput";
import SectionWrapper from "@/components/Layout/SectionWrapper";
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
    <SectionWrapper className="pt-40 pb-20">
      <div className="w-full rounded-2xl border-[1px] border-gray-300 flex">
        {/* form */}
        <div className=" w-full py-20 px-11 flex flex-col gap-10">
          <div className="flex gap-5">
            <FormInput placeholder="FullName" type="text" />
            <FormInput placeholder="Email" type="email" />
          </div>
          <FormInput placeholder="Subject" type="text" />
          <FormTextArea placeholder="Description" rows={10} />
          <div>
            <FormButton>Submit</FormButton>
          </div>
        </div>

        {/* details,  and links part */}

        <div className=" bg-[#F7F4F2] px-28    ">
          <div className="flex flex-col gap-12 py-20 items-center justify-center h-full">
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
