"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormInput({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  validation,
  children,
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {children}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="px-5 py-6 rounded-lg"
        {...register(id, validation)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
