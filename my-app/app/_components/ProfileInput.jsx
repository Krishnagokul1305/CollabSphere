"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileInput({
  label,
  name,
  register,
  errors,
  type = "text",
  isLoading = true,
  disabled = false,
}) {
  return (
    <div className="flex md:gap-4 gap-2 md:flex-row flex-col md:items-center">
      <div className="space-y-1 basis-[20%]">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="w-full">
        {isLoading ? (
          <Skeleton className="w-full border rounded-lg px-4 py-6" />
        ) : (
          <input
            id={name}
            type={type}
            disabled={disabled}
            defaultValue={""}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className={`w-full border rounded-lg px-4 py-3 ${
              disabled ? "text-gray-300" : "text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register(name, {
              required: `${label} is required`,
              ...(name === "fullName" && {
                minLength: {
                  value: 3,
                  message: "Full Name must be at least 3 characters",
                },
              }),
              ...(name === "email" && {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }),
            })}
          />
        )}
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1.5">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
}
