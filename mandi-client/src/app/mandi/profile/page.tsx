"use client";
import UserAccount from "@/components/section/account/userAccount";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col mt-10">
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="space-y-3">
            <div>
              <h4 className="text-2xl font-bold">Account</h4>
            </div>
           <UserAccount/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
