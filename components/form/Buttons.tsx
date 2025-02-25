"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Rotate3D, Star } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { RatingStar } from "@/utils/mockdata/ratingdata";

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
  return (
    <SignInButton mode="modal">
      <Button size={"icon"} variant={"outline"}>
        <Heart />
      </Button>
    </SignInButton>
  );
};
export const SignInRatingButton = () => {
  return (
    <>

    <div className ="flex flex-col gap-y-3">

    <div className="text-[20px] font-bold text-end">
      ให้คะแนนรีวิว
    </div>
      <div className="flex items-center gap-2">
      {RatingStar.map((score) => (
        <SignInButton key={score} mode="modal">
          <Button size="icon" variant="outline">
            <Star className="cursor-pointer hover:scale-110 transition-transform"/>
          </Button>
        </SignInButton>
      ))}
      </div>
      </div>
    </>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size={"icon"} variant={"outline"}>
      {pending ? (
        <Rotate3D className="animate-spin" />
      ) : isFavorite ? (
        <Heart fill="red" />
      ) : (
        <Heart />
      )}
    </Button>
  );
};
