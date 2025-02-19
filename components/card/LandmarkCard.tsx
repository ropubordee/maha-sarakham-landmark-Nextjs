import { LandmarkCardProps } from "@/utils/types";
import Image from "next/image";
import React from "react";
import LandmarkRating from "./LandmarkRating";
import FavariteToggleButton from "./FavariteToggleButton";

const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
  const { name, image, description, id, district, lat, lng, category, price } =
    landmark;

  return (
    <article className="group relative">
      <div className="relative h-[300px] rounded-md">
        <Image
          src={image}
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
          fill
          alt={name}
        />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold mt-2">{name.substring(0, 30)}</h3>
        <LandmarkRating />
      </div>
      <p className="text-sm mt-1 text-muted-foreground">
        {description.substring(0, 40)}
      </p>

      <div className="mt-2 flex items-center justify-between font-semibold text-sm">
        <span >฿{price}</span>
        <p>{district}</p>
      </div>

    <div className="absolute top-5 right-5">
      <FavariteToggleButton landmarkId={id}/>
    </div>


    </article>
  );
};

export default LandmarkCard;
