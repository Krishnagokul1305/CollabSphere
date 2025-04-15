"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchFilter = searchParams.get("search") || ""; // Get 'search' param from URL

  const handleSearch = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value); // Update URL query param
    } else {
      params.delete("search"); // Remove if empty
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center">
      <Input
        placeholder="Search..."
        value={searchFilter}
        onChange={handleSearch}
        className="max-w-sm"
      />
    </div>
  );
}

export default Search;
