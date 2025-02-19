"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "../FormInput";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "../Spinner";
import Logo from "../Logo";
import { signup } from "@/app/lib/user";
import { useState } from "react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  let [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await signup(data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your full name"
            register={register}
            validation={{ required: "Full name is required" }}
            error={errors.fullname}
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
            disabled={loading}
          >
            {loading ? <Spinner /> : "Register"}
          </Button>

          <div className="text-center text-sm tracking-wide">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
