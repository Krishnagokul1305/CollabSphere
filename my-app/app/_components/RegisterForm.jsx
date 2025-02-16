"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Logo from "./Logo";
import { useState } from "react";
import { OtpModal } from "./OtpModal";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [verifying, setVerifying] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [loading, setLoading] = useState("");

  // Handle submission of the sign-up form
  const onSubmit = async (data) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
      setOtpOpen(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      toast.error(err.message);
    }
  };

  const handleVerify = async (otpCode) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });
      setLoading(false);
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        toast.success("Account created successfully!");
        setOtpOpen(false);
        router.push("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
      toast.error(err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold">Create an Account</h1>
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

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            validation={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            error={errors.password}
          />

          <Button
            type="submit"
            className="w-full py-6 px-5 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Register"}
          </Button>

          <div className="text-center text-sm tracking-wide">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </form>

      {/* OTP Modal */}
      {verifying && (
        <OtpModal
          open={otpOpen}
          loading={loading}
          onClose={() => setOtpOpen(false)}
          onVerify={handleVerify}
        />
      )}
    </div>
  );
}
