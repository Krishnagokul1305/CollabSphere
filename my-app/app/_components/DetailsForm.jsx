"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ProfileInput from "./ProfileInput";
import ImageUploader from "./ImageUploader";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

function DetailsForm() {
  const { user, isLoaded } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.emailAddresses?.[0]?.emailAddress,
      username: user?.username,
      firstname: user?.firstName,
      lastname: user?.lastName,
    },
  });

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      reset({
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        username: user?.username || "",
        firstname: user?.firstName || "",
        lastname: user?.lastName || "",
      });
    }
  }, [isLoaded, user, reset]);

  async function onSubmit(data) {
    try {
      setLoading(true);
      const profileImage = getValues("profileImage");
      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);

        await user.setProfileImage({
          file: profileImage,
        });
      }
      await user.update({
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    }
    setLoading(false);
  }

  return (
    <form
      className="mt-5 md:space-y-7 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email Field */}
      <ProfileInput
        label="Email"
        isLoading={!isLoaded}
        name="email"
        type="email"
        register={register}
        errors={errors}
        disabled={true}
      />

      {/* Full Name Field */}
      <ProfileInput
        label="User Name"
        name="username"
        isLoading={!isLoaded}
        // disabled={true}
        register={register}
        errors={errors}
      />

      {/* <ProfileInput
        label="First Name"
        name="firstname"
        register={register}
        errors={errors}
      />
      <ProfileInput
        label="Last Name"
        name="lastname"
        register={register}
        errors={errors}
      /> */}

      {/* Avatar Upload */}
      <div className="flex md:flex-row flex-col  gap-4 md:items-center">
        <div className="space-y-1 basis-[20%]">
          <label className="font-medium ">Avatar</label>
        </div>
        <ImageUploader
          setValue={setValue}
          isLoading={!isLoaded}
          image={user?.imageUrl}
        />
      </div>

      {/* Submit Button */}
      <Button className="block ms-auto px-5" size="lg" type="submit">
        {loading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}

export default DetailsForm;
