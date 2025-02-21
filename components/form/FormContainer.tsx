"use client";
import { useToast } from "@/hooks/use-toast";
import { ActionType } from "@/utils/types";
import React, { useEffect } from "react";
import { useActionState } from "react";

const initialState = {
  message: "",
};



const FormContainer = ({ action, children }: {action : ActionType,  children: React.ReactNode }) => {

  const {toast} = useToast()

  const [state, formAction] = useActionState(action, initialState);
  // console.log("state =  " ,state);

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>
    {children}
    </form>;
};

export default FormContainer;
