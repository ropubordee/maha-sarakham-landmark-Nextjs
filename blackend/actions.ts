"use server";

import { profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "./config/db";
import { redirect } from "next/navigation";

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
) : Promise<{message : string}> => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login");
    const rawData = Object.fromEntries(formData);
    // const valideteField = validateWithZod(profileSchema, rawData);
    console.log("valideFild", rawData);
  
  
    return { message: "Create Profile Success" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  // redirect("/");
};
