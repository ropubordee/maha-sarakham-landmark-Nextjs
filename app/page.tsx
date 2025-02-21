import React from "react";

import LandmarkContainer from "@/components/home/LandmarkContainer";

const HomePage = async ({
  searchParams,
}: {
  searchParams: { search?: string ,category?: string };
}) => {
  const { search,category } = await searchParams;


  return (
    <div>
      <LandmarkContainer search={search} category={category} />
    </div>
  );
};

export default HomePage;
