import { createProfileAction } from "@/backend/actions/profile";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const CreateProfile = async() => {
  const user = await currentUser()
  if(user?.privateMetadata.hasProfile) redirect('/')
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 ">New User</h1>
      <div className="border p-8 rounded-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="firstName"
              label="Frist Name"
              type="text"
              placeholder="First Name"
            />
            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Last Name"
            />
            <FormInput
              name="userName"
              label="UserName"
              type="text"
              placeholder="User Name"
            />
          </div>
          <SubmitButton text="create profile" size="default" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProfile;
