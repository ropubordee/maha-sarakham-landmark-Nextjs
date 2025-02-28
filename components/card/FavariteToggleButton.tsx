import React from "react";

import { auth } from "@clerk/nextjs/server";
import { SignInCardButton } from "../form/Buttons";
import FavoriteToggleForm from "../form/FavoriteToggleForm";
import { fetchFavoriteId } from "@/backend/actions/favorites";

const FavariteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
  const { userId } = await auth();
  // console.log(userId);

  if (!userId) return <SignInCardButton />;

  const favoriteId = await fetchFavoriteId({ landmarkId });
  // console.log(favoriteId);

  return <FavoriteToggleForm favoriteId={favoriteId} landmarkId={landmarkId} />;
};

export default FavariteToggleButton;
