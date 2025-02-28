"use server";
import db from "@/backend/config/db";
import { getAuthUser } from "./auth";
import { revalidatePath } from "next/cache";
import { renderError } from "./errors";

export const toggleFavoriteAction = async ({
  favoriteId,
  landmarkId,
  pathname,
}: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {

    try {
        const user = await getAuthUser()
        if(favoriteId){
            await db.favorite.delete({where : {id : favoriteId}});    
            
        }else{
            await db.favorite.create({
                data : {
                    landmarkId : landmarkId,
                    profileId : user.id,   
                }
            })
        }
        revalidatePath(pathname);
        return { message: favoriteId ? "Removed Favorite" : "Added Favorite" };
    } catch (error) {
        return renderError(error);
    }

};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const fetchFavorits = async () => {
  const user = await getAuthUser();

  const favorits = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          district: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  return favorits.map((favorite) => favorite.landmark);
};