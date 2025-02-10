"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    try {
      await resetPassword(data.newPassword);
      router.push("/login");
    } catch (error) {
      setError("newPassword", {
        message: error.message || "Failed to reset password",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span>Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Reset Password</h1>
          </div>

          <FormInput
            id="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            register={register}
            validation={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            error={errors.newPassword}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            register={register}
            validation={{ required: "Please confirm your password" }}
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            className="w-full py-6 px-5 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
