"use server";

import { imageSchema, landmarkSchema, validateWithZod } from "@/utils/schemas";
import { uploadFile } from "@/utils/supabase";
import  db  from '@/backend/config/db';
import { redirect } from "next/navigation";
import { getAuthUser } from "./auth";
import { renderError } from "./errors";

export const createLandmarkAction = async(prevState : unknown , formData : FormData)=>{


    try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File


    const validateFile = validateWithZod(imageSchema, {image : file})
    const validateFormInput = validateWithZod(landmarkSchema,rawData)
    
    if(!validateFormInput.lat && !validateFormInput.lng){
     throw new Error("กรุณาเลือกตำแหน่งให้ถูกต้อง")
    }

    const fullPath = await uploadFile(validateFile.image)

    await db.landmark.create({
        data : {
            ...validateFormInput,
            image : fullPath,
            profileId : user.id
        }
    })
        
    } catch (error) {
        return renderError(error);
    }
    redirect('/')

}

export const fetchLandmarks = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category: category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return landmarks;
};
export const fetchLandmarksHero = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return landmarks;
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  return db.landmark.findFirst({
    where: {
      id: id,
    },
    include: {
      profile: true,
    },
  });
};




