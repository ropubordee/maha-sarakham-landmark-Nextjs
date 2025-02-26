import { fetchLandmarkDetail } from "@/backend/actions";
import FavariteToggleButton from "@/components/card/FavariteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import RatingToggleButton from "@/components/rating/RatingToggleButton";


import React from "react";




const LandmarkDetail = async ({ params }: {params : Promise<{id : string}>}) => {
  const { id } =  await params;
  const landmark = await fetchLandmarkDetail({ id });

  if (!landmark)return <p>Loading...</p>;
  // console.log(landmark);


  return (
    <section>
      <Breadcrums name={landmark.name} />
      <header className="flex justify-between mt-4 items-center">
        <h1 className="text-4xl font-bold">{landmark.name}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton landmarkId={landmark.id} name={landmark.name} />
          <FavariteToggleButton landmarkId={landmark.id} />
        </div>
      </header>
      <ImageContainer mainImage={landmark.image} name={landmark.name} />
      <section>
        <div>
          <Description description={landmark.description} />
          <MapLandmark location={{ lat: landmark.lat, lng: landmark.lng }} />
        </div>
        <div className="flex justify-end mt-6 py-4 gap-y-3">
          <RatingToggleButton landmarkId={landmark.id} />
        </div>
      </section>
    </section>
  );
};

export default LandmarkDetail;
