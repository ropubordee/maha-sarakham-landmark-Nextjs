"use client";
import React, { useEffect, useState } from "react";

interface Profiletype {
  id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileDetail = ({
  dataProfile,
}: {
  dataProfile: Profiletype | null;
}) => {
  const [profiledata, setProfiledata] = useState<Profiletype | null>(null);

  const loadUserProfile = async () => {
    try {
      const data = await dataProfile;
      setProfiledata(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <div>
        <h1> ข้อมูลโปรไฟล์ </h1>
      <div>{profiledata?.firstName}</div>
      <div>{profiledata?.lastName}</div>
      <div>{profiledata?.email}</div>
      <div>{profiledata?.userName}</div>
      
    </div>
  );
};

export default ProfileDetail;
