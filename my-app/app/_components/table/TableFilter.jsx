"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SelectFilter({ name, options, defaultValue = "all" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.push(`?${params.toString()}`);
  };

  const currentValue = searchParams.get(name) || defaultValue;

  return (
    <Select
      value={currentValue}
      className="bg-sidebar"
      onValueChange={handleChange}
    >
      <SelectTrigger className="max-w-[150px] bg-sidebar">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
