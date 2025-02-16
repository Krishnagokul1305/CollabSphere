"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormInput from "./FormInput";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";
import { set } from "mongoose";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/");
  }

  const create = async (data) => {
    setLoading(true);
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });
      setSuccessfulCreation(true);
      toast.success("Reset code sent to your email");
    } catch (error) {
      console.error("error", error.errors?.[0]?.message);
      toast.error(error.errors?.[0]?.message);
    }
    setLoading(false);
  };

  const reset = async (data) => {
    setLoading(true);
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });

      if (result?.status === "needs_second_factor") {
        setSecondFactor(true);
      } else if (result?.status === "complete") {
        setActive({ session: result.createdSessionId });
      } else {
        console.log(result);
      }
      toast.success("Password reset successfully");
    } catch (error) {
      console.error("error", error.errors?.[0]?.message);
      toast.error(error.errors?.[0]?.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(successfulCreation ? reset : create)}
      >
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <h1 className="text-xl font-bold">Forgot Password?</h1>
        </div>
        {!successfulCreation ? (
          <>
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
              disabled={loading}
            >
              {loading ? <Spinner /> : "send reset code"}
            </Button>
          </>
        ) : (
          <>
            <FormInput
              id="password"
              label="New Password"
              type="password"
              placeholder="Enter new password"
              register={register}
              validation={{ required: "Password is required" }}
              error={errors.password}
            />
            <FormInput
              id="code"
              label="Reset Code"
              type="text"
              placeholder="Enter the code sent to your email"
              register={register}
              validation={{ required: "Reset code is required" }}
              error={errors.code}
            />
            <Button
              type="submit"
              className="w-full py-6 px-5 rounded-lg"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Reset Password"}
            </Button>
          </>
        )}

        {secondFactor && (
          <p className="text-yellow-500">
            2FA is required, but not handled here.
          </p>
        )}
      </form>
      <div className="text-center text-sm tracking-wide">
        Remembered your password?{" "}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
