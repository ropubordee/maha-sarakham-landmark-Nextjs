import { fetchProfile } from "@/backend/actions/profile";
import ProfileDetail from "@/components/profile/ProfileDetail";
import React from "react";

const ProFilePage = async() =>{


  const dataProfile =  await fetchProfile()

  return <div>
    <ProfileDetail dataProfile={dataProfile}/>
  </div>;
};

export default ProFilePage;
