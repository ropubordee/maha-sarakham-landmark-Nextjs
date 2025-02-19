import { z, ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัว" }),
  lastName: z.string().min(2, { message: "นามสกุลต้องมากกว่า 2 ตัว" }),
  userName: z.string().min(2, { message: "ชื่อผู้ใช้ต้องมากกว่า 2 ตัว" }),
});

const validateImage = () =>{
  const maxFileSize = 1024*1024
  return z.instanceof(File).refine((file)=>{
   return file.size <= maxFileSize
  },'File size must be less than 1MB')
}

export const imageSchema = z.object({
  image : validateImage()
})

export const landmarkSchema = z.object({
  name : z.string().min(2,{message : 'ชื่อต้องมากกว่า 2 ตัว'})
  .max(30, {message : 'ชื่อต้องน้อยกว่า 30ตัว'}),
  category : z.string(),
  description : z.string().min(2, {message : "รายละเอียดต้องมากกว่า 2 ตัว"}).max(200,{message : "รายละเอียดต้องน้อยกว่า 200"}),
  price : z.coerce.number().int().min(0,{message : 'ราคาต้องมากกว่า 0'}),
  district : z.string(),
  lat : z.coerce.number(),
  lng : z.coerce.number()
})


export const validateWithZod =  <T>(
    schema: ZodSchema<T>, 
    data: unknown) : T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
