"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ProfileInput from "./ProfileInput";
import ImageUploader from "./ImageUploader";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../Spinner";
import { updateUser } from "@/app/lib/actions/userAction";

export default function UserDetailsForm({ user, id }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNo: user?.phoneNo,
      Bio: user?.Bio,
    },
  });

  let [loading, setLoading] = useState(false);

  async function onSubmit(formData) {
    try {
      setLoading(true);

      const updatedData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          updatedData.append(key, value);
        }
      });

      const profileImage = getValues("profileImage");
      if (profileImage instanceof File) {
        updatedData.append("file", profileImage);
      }

      toast.promise(updateUser(id, updatedData), {
        loading: "Updating profile...",
        success: () => {
          toast.success("Profile updated successfully");
        },
        error: (error) => {
          toast.error(error.message || "Failed to update profile");
          return error;
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto md:p-6 w-full p-3">
      <h2 className="text-xl font-semibold">User Information</h2>
      <form
        className="mt-5 md:space-y-7 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProfileInput
          label="Email"
          name="email"
          type="email"
          // isLoading={status === "loading"}
          register={register}
          errors={errors}
          disabled={true}
        />

        {/* Full Name Field */}
        <ProfileInput
          label="User Name"
          name="name"
          // isLoading={status === "loading"}
          register={register}
          errors={errors}
        />

        <ProfileInput
          label="PhoneNo"
          name="phoneNo"
          // isLoading={status === "loading"}
          register={register}
          errors={errors}
        />

        {/* Avatar Upload */}
        <div className="flex md:flex-row flex-col gap-4 md:items-center">
          <div className="space-y-1 basis-[20%]">
            <label className="font-medium ">Avatar</label>
          </div>
          <ImageUploader
            setValue={setValue}
            // isLoading={status == "loading"}
            image={user?.avatar}
          />
        </div>

        <ProfileInput
          label="Description"
          name="Bio"
          // isLoading={status === "loading"}
          register={register}
          errors={errors}
          textArea={true}
        />

        {/* Submit Button */}
        <Button className="block ms-auto px-5" size="lg" type="submit">
          {loading ? <Spinner /> : "Save"}
        </Button>
      </form>
    </div>
  );
}
