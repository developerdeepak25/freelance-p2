"use client";
import Heading from "@/components/Text/Heading";
import React, { useEffect } from "react";
import GalleryEvent from "../GalleryEvent";
import { Loader2 } from "lucide-react";
import { GallerImageType } from "@/Types/types";

interface GalleryItem {
  title: string;
  description: string;
  imageDetails: GallerImageType[];
  driveLink: string;
  _id: string;
}

const GalleryEvents = () => {
  const [gallery, setGallery] = React.useState<GalleryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [iserror, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("/api/public/gallery", {
          cache: "no-store",
        });
        // const data = await response.json();
        const data = await response.json();
        console.log(response, data);
        setGallery(data);
      } catch (error) {
        setIsError(true);

        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader2 className="mr-2 h-7 aspect-square animate-spin" />;
  }

  if (iserror) {
    return <Heading variant="medium">Something went wrong!!</Heading>;
  }

  return gallery.length === 0 ? (
    <Heading variant="medium">Nothing to show</Heading>
  ) : (
    gallery?.map((item, index) => (
      <GalleryEvent
        key={index}
        title={item.title}
        desc={item.description}
        images={item.imageDetails}
        seeMore={item.driveLink}
        id={item._id}
      />
    ))
  );
};

export default GalleryEvents;
