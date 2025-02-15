"use client";

import { useState } from "react";
import ProfileInput from "./ProfileInput";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProfileEditForm() {
  const [firstName, setFirstName] = useState("Vincent");
  const [lastName, setLastName] = useState("Brooks");
  const [email, setEmail] = useState("vincbrooks32@catherineorkatherine.com");

  return (
    <div className="mx-auto md:p-6 p-3 rounded-lg">
      <h2 className="text-2xl font-semibold">User Information</h2>
      {/* <p className="dark:text-gray-300 text-gray-500 md:text-base text-sm tracking-wide md:tracking-normal mt-1">
        Here you can edit public information about yourself. The changes will be
        displayed for other users within 5 minutes.
      </p> */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold"></h2>
        <ProfileInput
          label="Email address"
          type="email"
          value={email}
          disabled={true}
        />
        <ProfileInput
          label="Full Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="full name"
        />
        <Button className="mt-5 block ms-auto px-5" size="lg">
          Save
        </Button>
      </div>
      <div>
        <h1 className="text-xl font-semibold"> Update Password</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <ProfileInput
            label="Password"
            type="password"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Password"
          />
          <ProfileInput
            label="New Password"
            type="password"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="New Password"
          />
        </div>
        <Alert variant="warning" className="mt-5">
          {/* <MessageCircleWarning className="h-4 w-4" /> */}
          {/* <AlertTitle>Warning</AlertTitle> */}
          <AlertDescription>
            If you have signed in with google use forgot password to update
          </AlertDescription>
        </Alert>
        <Button className="mt-5 block ms-auto px-5" size="lg">
          Save
        </Button>
      </div>
    </div>
  );
}
