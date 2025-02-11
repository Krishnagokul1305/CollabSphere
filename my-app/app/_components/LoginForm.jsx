"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { login } from "../lib/auth";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Failed to login");
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
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
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
            className="w-full py-6 px-5 rounded-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Login"}
          </Button>

          <div className="flex justify-between text-sm">
            <Link
              href="/forgotPassword"
              className="text-blue-500 hover:underline ms-auto"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-sm tracking-wide">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
