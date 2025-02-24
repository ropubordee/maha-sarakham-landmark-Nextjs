import { LandmarkCardProps } from "@/utils/types";
import Image from "next/image";
import React from "react";
import LandmarkRating from "./LandmarkRating";
import FavariteToggleButton from "./FavariteToggleButton";
import Link from "next/link";

const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
  const { name, image, description, id, district, lat, lng, category, price } =
    landmark;

  return (
    <article className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/landmark/${id}`}>
      <div className="relative h-56">
        <Image
          src={image}
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          fill
          alt={name}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-800 truncate w-4/5">
            {name}
          </h3>
          <LandmarkRating />
        </div>
        <p className="text-xs text-gray-500 mt-1">{category}</p>

        <p className="text-sm text-gray-600 mt-1 truncate w-full">
          {description}
        </p>

        <div className="mt-3 text-sm text-gray-700">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-primary">฿{price}</span>
            <p className="text-gray-500">{district}</p>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            📍 {lat}, {lng}
          </p>
        </div>
      </div>

      </Link>
      <div className="absolute top-4 right-4">
        <FavariteToggleButton landmarkId={id} />
      </div>
    </article>
  );
};

export default LandmarkCard;
