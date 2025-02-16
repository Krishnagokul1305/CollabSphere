"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Logo from "./Logo";
import { RedirectToSignIn, useSignIn } from "@clerk/nextjs";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const onSubmit = async (data) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Logged in successfully");
        router.push("/");
      } else {
        console.error("Sign-in not complete", result);
      }
    } catch (error) {
      toast.error(error.errors?.[0]?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/oauth-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold">Welcome to ChatterBox.</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
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
            >
              <div className="flex justify-between text-sm">
                <Link
                  className="hover:underline ms-auto"
                  href={"/forgotPassword"}
                >
                  Forgot Password?
                </Link>
              </div>
            </FormInput>

            <Button
              type="submit"
              className="w-full py-6 px-5 rounded-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Login"}
            </Button>
          </form>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full p-6 flex gap-2 justify-center items-center"
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>

          <div className="text-center text-sm tracking-wide">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
