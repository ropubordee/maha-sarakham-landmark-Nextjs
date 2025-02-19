"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Rotate3D } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

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


export const SignInCardButton = () => {
  return <SignInButton mode='modal'>
    <Button size={'icon'} variant={'outline'}>
      <Heart/>
    </Button>
  </SignInButton>
}
