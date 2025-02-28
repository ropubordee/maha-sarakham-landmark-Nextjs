export const renderError = (error: unknown): { message: string } => {
    return { message: error instanceof Error ? error.message : "Error" };
  };
  