"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../FormInput";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import Link from "next/link";
import { forgotPassword } from "@/app/lib/user";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success("Reset code sent to your email");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <h1 className="text-xl font-bold">Forgot Password?</h1>
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
          {isSubmitting ? <Spinner /> : "Send Reset Code"}
        </Button>
      </form>
      <div className="text-center text-sm tracking-wide">
        Remembered your password?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
