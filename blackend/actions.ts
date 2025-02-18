"use server";

import { profileSchema, validateWithZod } from "@/utils/schemas";
import { currentUser } from "@clerk/nextjs/server";
import db from './config/db'

const getAuthUser = async() =>{

    const user = await currentUser()
    if(!user){
        throw new Error('You must logged')
    }

    return user
}

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
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData);
    const valideteField = validateWithZod(profileSchema, rawData);
 
    await db.profile.create({
        data : {
            clerkId : user.id,
            email : user.emailAddresses[0].emailAddress,
            profileImage : user.imageUrl ?? '',
            ...valideteField
        }
    })

    return { message: "Create Profile Success" };
  } catch (error) {
    console.log(error);
    return renderError(error)
  }
};
