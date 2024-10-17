// "use client";
// import { AddButton } from "@/components/buttons/ModifiedButton";
// import { FormInputWithLabel } from "@/components/FormInput";
// import { FormModal } from "@/components/FormModel";
// import SectionWrapper from "@/components/Layout/SectionWrapper";
// import GalleryEvent from "@/components/pages/Gallery/GalleryEvent";
// import Heading from "@/components/Text/Heading";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// const gallery = [
//   {
//     title: "Blood Donation",
//     description:
//       "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
//     // category: 'blood-donation',
//     images: [
//       "/image/gallery1.png",
//       "/image/gallery3.png",
//       "/image/gallery2.png",
//       "/image/gallery2.png",
//     ],
//     seeMore: "https://google.com",
//   },
//   {
//     title: "Blood Donation",
//     description: "Lorem ipsum dolor sit amet consectetur",
//     // category: 'blood-donation',
//     images: [
//       "/image/gallery1.png",
//       "/image/gallery2.png",
//       "/image/gallery3.png",
//     ],
//     seeMore: "https://google.com",
//   },
//   {
//     title: "Blood Donation",
//     description: "Lorem ipsum dolor sit amet consectetur",
//     // category: 'blood-donation',
//     images: [
//       "/image/gallery1.png",
//       "/image/gallery2.png",
//       "/image/gallery3.png",
//     ],
//     seeMore: "https://google.com",
//   },
// ];

// interface FormValues {
//   images: FileList;
//   title: string;
//   description: string;
//   driveLink: string;
// }

// const AdminGallery = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const onSubmit = async (data: FormValues) => {
//     // Make your API call here
//     console.log(data);
//     // await api.updateUser(data);
//   };

//   return (
//     <SectionWrapper className="pt-40 pb-40">
//       <div className="flex justify-between items-center gap-3 pb-10">
//         <Heading variant="medium" className="text-center">
//           Admin Gallery{" "}
//         </Heading>
//         {/* button to add gallery */}
//         <AddButton onClick={() => setIsModalOpen(true)}>Add</AddButton>
//       </div>
//       <div className=" mt-10 flex flex-col items-center gap-20">
//         {gallery.length === 0 && (
//           // <p className="text-base text-my-para font-bold text-center">
//           <Heading variant="medium">Nothing to show</Heading>
//         )}
//         {gallery.map((item, index) => (
//           <GalleryEvent
//             key={index}
//             title={item.title}
//             desc={item.description}
//             images={item.images}
//             seeMore={item.seeMore}
//           />
//         ))}
//       </div>
//       <FormModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Edit User"
//         onSubmit={onSubmit}
//         submitButtonText="Update User"
//       >
//         <div className="space-y-4">
//           <form onSubmit={handleSubmit}>
//             <FormInputWithLabel
//               {...register("title")}
//               // name="title"
//               id="title"
//               label="Name"
//             />
//           </form>
//         </div>
//       </FormModal>
//     </SectionWrapper>
//   );
// };

// export default AdminGallery;




"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddButton } from "@/components/buttons/ModifiedButton";
import { FormInputWithLabel } from "@/components/FormInput";
import { FormModal } from "@/components/FormModel";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import GalleryEvent from "@/components/pages/Gallery/GalleryEvent";
import Heading from "@/components/Text/Heading";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  title: string;
  description: string;
  images: string[];
  seeMore: string;
}

interface FormValues {
  images: FileList;
  title: string;
  description: string;
  driveLink: string;
}

const gallery: GalleryItem[] = [
  {
    title: "Blood Donation",
    description:
      "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
    images: [
      "/image/gallery1.png",
      "/image/gallery3.png",
      "/image/gallery2.png",
      "/image/gallery2.png",
    ],
    seeMore: "https://google.com",
  },
  // ... (other gallery items)
];

const AdminGallery: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Make your API call here
    console.log(data);
    // await api.updateUser(data);
    setIsModalOpen(false);
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
        {gallery.length === 0 ? (
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
        )}
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Gallery Item"
        // onSubmit={()=>handleSubmit(onSubmit)}
        submitButtonText="Add Item"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputWithLabel
            {...register("title", { required: "Title is required" })}
            id="title"
            label="Title"
          />
          <FormInputWithLabel
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            label="Description"
          />
          <FormInputWithLabel
            {...register("driveLink", { required: "Drive link is required" })}
            id="driveLink"
            label="Drive Link"
          />
          <FormInputWithLabel
            {...register("images", { required: "Images are required" })}
            id="images"
            label="Images"
            type="file"
            multiple
          />
          <Button variant={"primary-solid"} type="submit">
            submit
          </Button>
        </form>
      </FormModal>
    </SectionWrapper>
  );
};

export default AdminGallery;