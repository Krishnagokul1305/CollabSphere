"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileInput({
  label,
  name,
  register,
  errors,
  type = "text",
  isLoading = false,
  disabled = false,
  textArea = false,
}) {
  return (
    <div className="flex md:gap-4 gap-2 md:flex-row flex-col md:items-center">
      <div className="space-y-1 basis-[20%]">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="w-full">
        {isLoading ? (
          textArea ? (
            <Skeleton className="w-full border rounded-lg px-4 py-6 h-40" />
          ) : (
            <Skeleton className="w-full border rounded-lg px-4 py-6" />
          )
        ) : textArea ? (
          <textarea
            id={name}
            disabled={disabled}
            rows={5}
            defaultValue={""}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className={`w-full border bg-primary/5 rounded-lg px-4 py-3 resize-none ${
              disabled
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-700 dark:text-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register(name, {
              required: `${label} is required`,
            })}
          />
        ) : (
          <input
            id={name}
            type={type}
            disabled={disabled}
            defaultValue={""}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className={`w-full bg-primary/5 border rounded-lg px-4 py-3 ${
              disabled
                ? "text-gray-700 dark:text-gray-200 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-200"
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
