"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "./config/db";
import { redirect } from "next/navigation";
import { uploadFile } from "./config/supabase";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "Error",
  };
};

export const creactProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login");
    const rawData = Object.fromEntries(formData);
    const valideteField = validateWithZod(profileSchema, rawData);
    console.log("valideFild", valideteField);
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...valideteField,
      },
    });
    const clinent = await clerkClient();

    await clinent.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return { message: "Create Profile Success" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const creactLandmarkAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    console.log("valideFild", file);
    const validatedFile = validateWithZod(imageSchema, { image: file });
    const validatedFormInput = validateWithZod(landmarkSchema, rawData);
    console.log("vaildate", validatedFile);
    console.log("vaildate", validatedFormInput);

    if (
      validatedFormInput.lat === null ||
      validatedFormInput.lng === null ||
      validatedFormInput.lat === 0 ||
      validatedFormInput.lng === 0
    ) {
      throw new Error("กรุณาเลือกตำแหน่งให้ถูกต้อง");
    }

    const fullPath = await uploadFile(validatedFile.image);
    console.log(fullPath);

    await db.landmark.create({
      data: {
        ...validatedFormInput,
        image: fullPath,
        profileId: user.id,
      },
    });

    // return { message: "Create Profile Success" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const fetchLandmarks = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return landmarks;
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

export const toggleFavoriteAction = async () => {
  return { message: "Add favorite" };
};
