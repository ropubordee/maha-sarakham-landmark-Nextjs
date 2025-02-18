export type ActionType = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;
