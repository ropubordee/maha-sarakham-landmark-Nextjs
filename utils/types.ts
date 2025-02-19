export type ActionType = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;


export type LandmarkCardProps = {
  id : string;
  name : string
  image : string
  category : string
  district : string
  description : string
  lat : number
  lng : number
  price : number
}