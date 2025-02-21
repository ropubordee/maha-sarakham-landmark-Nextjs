import { fetchLandmarkDetail } from "@/blackend/actions";
import Breadcrums from "@/components/landmark/Breadcrums";

import React from "react";

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({id});
    console.log(landmark)
  return <section><Breadcrums/></section>;
};

export default LandmarkDetail;
