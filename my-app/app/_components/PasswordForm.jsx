"use client";

import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProfileInput from "./ProfileInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { useState } from "react";

function PasswordForm() {
  const { user, isLoaded } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await user.updatePassword({
        currentPassword: data.password,
        newPassword: data.newPassword,
      });
      toast.success("Password updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update password");
    }
    setLoading(false);
  };

  return (
    <form
      className="mt-8 md:space-y-7 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold">Update Password</h1>

      <ProfileInput
        label="Password"
        name="password"
        isLoading={!isLoaded}
        type="password"
        register={register}
        errors={errors}
      />

      {/* New Password */}
      <ProfileInput
        label="New Password"
        name="newPassword"
        isLoading={!isLoaded}
        type="password"
        register={register}
        errors={errors}
      />

      <Alert variant="warning" className="mt-5">
        <AlertDescription>
          If you have signed in with Google, use Forgot Password to update.
        </AlertDescription>
      </Alert>

      <Button type="submit" className="mt-5 block ms-auto px-5" size="lg">
        {loading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}

export default PasswordForm;
