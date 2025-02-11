"use client";

import {
  GalleryVerticalEnd,
  MessageCircleCode,
  MessageCircleCodeIcon,
  MessageSquareMoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Link from "next/link";
import { forgotPassword } from "../lib/auth";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Logo from "./Logo";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success("Reset email sent");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
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
            {isSubmitting ? <Spinner /> : "Send Reset Link"}
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
