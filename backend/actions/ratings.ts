"use server";
import db from "@/backend/config/db";
import { getAuthUser } from "./auth";

export const createRating = async ({
  landmarkId,
  score,
}: {
  landmarkId: string;
  score: number;
}) => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("Please login");

    const existingRating = await db.rating.findFirst({
      where: {
        profileId: user.id,
        landmarkId: landmarkId,
      },
    });

    if (existingRating) {
      await db.rating.update({
        where: { id: existingRating.id },
        data: { score: score },
      });
    } else {
      await db.rating.create({
        data: {
          score: score,
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchRatingAverage = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  try {
    const averageRating = await db.rating.aggregate({
      where: {
        landmarkId: landmarkId,
      },
      _avg: {
        score: true,
      },
    });
    return averageRating._avg.score;
  } catch (error) {
    console.log(error);
  }
};
