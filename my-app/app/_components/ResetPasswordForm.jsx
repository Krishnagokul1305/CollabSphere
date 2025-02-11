"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { resetPassword } from "../lib/auth";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Logo from "./Logo";

function ResetPasswordForm({ resetToken }) {
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
      await resetPassword(data.newPassword, resetToken);
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
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
            {isSubmitting ? <Spinner /> : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
