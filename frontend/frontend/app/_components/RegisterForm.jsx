"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import Link from "next/link";
import { register as registerApi } from "../lib/auth";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await registerApi(data.email, data.password, data.name);
      toast.success("Registration successful");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
            <h1 className="text-xl font-bold">Create an Account</h1>
          </div>

          <FormInput
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            register={register}
            validation={{ required: "Name is required" }}
            error={errors.name}
          />

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
            {isSubmitting ? "Registering..." : "Register"}
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
