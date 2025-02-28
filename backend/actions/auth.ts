import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};