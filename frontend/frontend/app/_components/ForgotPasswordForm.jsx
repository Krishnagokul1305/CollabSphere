"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import Link from "next/link";
import { sendPasswordResetEmail, resetPassword } from "../lib/auth";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(data.email);
      alert("Password reset email sent!");
    } catch (error) {
      setError("email", {
        message: error.message || "Failed to send reset email",
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
            <h1 className="text-xl font-bold">Forgot Password</h1>
          </div>

          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            validation={{ required: "Email is required" }}
            error={errors.email}
          />

          <Button
            type="submit"
            className="w-full py-6 px-5 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center text-sm tracking-wide">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
