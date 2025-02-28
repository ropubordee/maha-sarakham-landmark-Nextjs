// "use server";
// import 'dotenv/config'; 
// import {
//   imageSchema,
//   landmarkSchema,
//   profileSchema,
//   validateWithZod,
// } from "@/utils/schemas";
// import { clerkClient, currentUser } from "@clerk/nextjs/server";
// import db from "./config/db";
// import { redirect } from "next/navigation";

// import { revalidatePath } from "next/cache";
// import { uploadFile } from '@/utils/supabase';

// export const getAuthUser = async () => {
//   const user = await currentUser();
//   if (!user) {
//     throw new Error("You must logged");
//   }
//   if (!user.privateMetadata.hasProfile) redirect("/profile/create");

//   return user;
// };

// const renderError = (error: unknown): { message: string } => {
//   return {
//     message: error instanceof Error ? error.message : "Error",
//   };
// };

// export const creactProfileAction = async (
//   prevState: unknown,
//   formData: FormData
// ) => {
//   try {
//     const user = await currentUser();
//     if (!user) throw new Error("Please Login");
//     const rawData = Object.fromEntries(formData);
//     const valideteField = validateWithZod(profileSchema, rawData);
//     console.log("valideFild", valideteField);
//     await db.profile.create({
//       data: {
//         clerkId: user.id,
//         email: user.emailAddresses[0].emailAddress,
//         profileImage: user.imageUrl ?? "",
//         ...valideteField,
//       },
//     });
//     const clinent = await clerkClient();

//     await clinent.users.updateUserMetadata(user.id, {
//       privateMetadata: {
//         hasProfile: true,
//       },
//     });

//     // return { message: "Create Profile Success" };
//   } catch (error) {
//     // console.log(error);
//     return renderError(error);
//   }
//   redirect("/");
// };

// export const creactLandmarkAction = async (
//   prevState: unknown,
//   formData: FormData
// ): Promise<{ message: string }> => {
//   try {
//     const user = await getAuthUser();
//     const rawData = Object.fromEntries(formData);
//     const file = formData.get("image") as File;
//     console.log("valideFild", file);
//     const validatedFile = validateWithZod(imageSchema, { image: file });
//     const validatedFormInput = validateWithZod(landmarkSchema, rawData);
//     // console.log("vaildate", validatedFile);
//     // console.log("vaildate", validatedFormInput);

//     if (
//       validatedFormInput.lat === null ||
//       validatedFormInput.lng === null ||
//       validatedFormInput.lat === 0 ||
//       validatedFormInput.lng === 0
//     ) {
//       throw new Error("กรุณาเลือกตำแหน่งให้ถูกต้อง");
//     }

//     const fullPath = await uploadFile(validatedFile.image);
//     console.log(fullPath);

//     await db.landmark.create({
//       data: {
//         ...validatedFormInput,
//         image: fullPath,
//         profileId: user.id,
//       },
//     });

//     // return { message: "Create Profile Success" };
//   } catch (error) {
//     // console.log(error);
//     return renderError(error);
//   }
//   redirect("/");
// };

// export const fetchLandmarks = async ({
//   search = "",
//   category,
// }: {
//   search?: string;
//   category?: string;
// }) => {
//   const landmarks = await db.landmark.findMany({
//     where: {
//       category: category,
//       OR: [
//         { name: { contains: search, mode: "insensitive" } },
//         { description: { contains: search, mode: "insensitive" } },
//       ],
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return landmarks;
// };
// export const fetchLandmarksHero = async () => {
//   const landmarks = await db.landmark.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return landmarks;
// };

// export const fetchFavoriteId = async ({
//   landmarkId,
// }: {
//   landmarkId: string;
// }) => {
//   const user = await getAuthUser();
//   const favorite = await db.favorite.findFirst({
//     where: {
//       landmarkId: landmarkId,
//       profileId: user.id,
//     },
//     select: {
//       id: true,
//     },
//   });
//   return favorite?.id || null;
// };

// export const toggleFavoriteAction = async (prevState: {
//   favoriteId: string | null;
//   landmarkId: string;
//   pathname: string;
// }) => {
//   const { favoriteId, landmarkId, pathname } = prevState;
//   try {
//     const user = await getAuthUser();
//     if (favoriteId) {
//       await db.favorite.delete({
//         where: {
//           id: favoriteId,
//         },
//       });
//     } else {
//       await db.favorite.create({
//         data: {
//           landmarkId: landmarkId,
//           profileId: user.id,
//         },
//       });
//     }
//     revalidatePath(pathname);
//     return { message: favoriteId ? "Removed Favorite" : "Add Favorite" };
//   } catch (error) {
//     return renderError(error);
//   }
// };

// export const fetchFavorits = async () => {
//   const user = await getAuthUser();

//   const favorits = await db.favorite.findMany({
//     where: {
//       profileId: user.id,
//     },
//     select: {
//       landmark: {
//         select: {
//           id: true,
//           name: true,
//           description: true,
//           image: true,
//           price: true,
//           district: true,
//           lat: true,
//           lng: true,
//           category: true,
//         },
//       },
//     },
//   });
//   return favorits.map((favorite) => favorite.landmark);
// };

// export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
//   return db.landmark.findFirst({
//     where: {
//       id: id,
//     },
//     include: {
//       profile: true,
//     },
//   });
// };

// export const createRating = async ({
//   landmarkId,
//   score,
// }: {
//   landmarkId: string;
//   score: number;
// }) => {
//   try {
//     const user = await getAuthUser();

//     if (!user) throw new Error("Please Login");

//     const checkRaing = await db.rating.findFirst({
//       where: {
//         profileId: user.id,
//         landmarkId: landmarkId,
//       },
//     });

//     if (checkRaing) {
//       await db.rating.update({
//         where: {
//           id: checkRaing.id,
//         },
//         data: {
//           score: score,
//         },
//       });
//     } else {
//       await db.rating.create({
//         data: {
//           score: score,
//           landmarkId: landmarkId,
//           profileId: user.id,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const fetchRatingAverage = async ({
//   landmarkId,
// }: {
//   landmarkId: string;
// }) => {
//   try {
//     const averageRating = await db.rating.aggregate({
//       where: {
//         landmarkId: landmarkId,
//       },
//       _avg: {
//         score: true,
//       },
//     });
//     return averageRating._avg.score;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const fetchRatingDetail = async ({
//   landmarkId,
// }: {
//   landmarkId: string;
// }) => {
//   try {
//     const user = await getAuthUser();

//     if (!user) return null;

//     const checkRaing = await db.rating.findFirst({
//       where: {
//         profileId: user.id,
//         landmarkId: landmarkId,
//       },
//     });

//     if (checkRaing) {
//       return checkRaing.score;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
