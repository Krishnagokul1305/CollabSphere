"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input"; // adjust import based on your setup
import { useState } from "react";

function TableSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleSearchChange}
      className="w-full max-w-sm bg-sidebar"
    />
  );
}

export default TableSearch;
