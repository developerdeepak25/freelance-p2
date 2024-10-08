"use client";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const CardCarousel = ({ children }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCanScrollNext(api.canScrollNext());
    setCanScrollPrev(api.canScrollPrev());

    //   setCount(api.scrollSnapList().length);
    // setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      // setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  const handlePrevClick = () => {
    if (api?.canScrollPrev()) {
      api.scrollPrev();
    }
  };

  const handleNextClick = () => {
    if (api?.canScrollNext()) {
      api.scrollNext();
    }
  };

  return (
    <>
      <Carousel setApi={setApi}>
        <CarouselContent className="-ml-10">{children}</CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
      <div className="flex gap-6  justify-end pt-7">
        <CarouselButton
          onClick={() => handlePrevClick()}
          className={`rotate-180  `}
          disabled={canScrollPrev}
        />
        <CarouselButton
          onClick={() => handleNextClick()}
          // className={`${!canScrollNext ? "opacity-50" : ""}`}
          disabled={canScrollNext}
        />
      </div>
    </>
  );
};

type CarouselButtonProps = {
  onClick: () => void;
  className?: string;
  // children: React.ReactNode;
  disabled: boolean;
};

const CarouselButton = ({
  onClick,
  className,
  disabled,
}: CarouselButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        ` border-[1px]    border-black  h-14 aspect-square rounded-full grid place-items-center  ${
          !disabled ? "opacity-50" : ""
        } ${className}`
      )}
    >
      <ArrowIcon />
    </button>
  );
};

export default CardCarousel;
