import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyList = ({
  heading = "No items",
  message = "Please try again",
  btnText = "back home",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) => {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{message}</p>
      <Button className="capitalize" asChild>
        <Link href={'/'}>
        
        {btnText}
        </Link>
        </Button>
    </div>
  );
};

export default EmptyList;
