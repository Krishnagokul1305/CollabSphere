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
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
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
