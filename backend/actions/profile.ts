"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/backend/config/db"
import { validateWithZod, profileSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";
import { renderError } from "./errors";
import { getAuthUser } from "./auth";


export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login");

    const rawData = Object.fromEntries(formData);
    const validData = validateWithZod(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validData,
      },
    });

    const clinent = await clerkClient();

    await clinent.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true },
    });

  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchProfile = async() =>{


  const user = await getAuthUser()

  console.log(user)

  const Profile = await db.profile.findFirst({

    where : {
      clerkId : user.id
    }

  })

  console.log(Profile)

  return Profile

}

fetchProfile()
