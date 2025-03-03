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
    <div className="flex flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">ข้อมูลโปรไฟล์</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-center mb-4">
          <img
            src={profiledata?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-300"
          />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold">
            {profiledata?.firstName} {profiledata?.lastName}
          </h2>
          <p className="text-gray-600">@{profiledata?.userName}</p>
          <p className="text-gray-500">{profiledata?.email}</p>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            สร้างบัญชีเมื่อ:
            {new Date(profiledata?.createdAt || "").toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            อัปเดตล่าสุด:
            {new Date(profiledata?.updatedAt || "").toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
