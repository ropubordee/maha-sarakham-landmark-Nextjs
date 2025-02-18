"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Rotate3D } from "lucide-react";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonType = {
  className?: string;
  size?: btnSize;
  text: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonType) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      size={size}
      className={`${className} capitalize`}
    >
      {pending ? (
        <>
          <Rotate3D className="animate-spin" />
          <span>Please wait..</span>
        </>
      ) : (
        <p>{text}</p>
      )}
    </Button>
  );
};
