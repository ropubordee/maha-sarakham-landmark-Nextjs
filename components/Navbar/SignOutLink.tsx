"use client";
import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

const SignOutLink = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({description : "Logout Successfully"})
  
  };

  return (
    <SignOutButton>
      <button onClick={handleLogout}>Logout</button>
    </SignOutButton>
  );
};

export default SignOutLink;
