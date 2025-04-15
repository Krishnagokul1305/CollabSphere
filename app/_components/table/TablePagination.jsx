"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const LIMIT = 6; // Default limit per page

export default function TablePagination({ count = 0 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    return page < 1 ? 1 : page;
  }, [searchParams]);

  const totalPages = Math.ceil(count / LIMIT);

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  // if (count === 0 || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-3 px-4 border-t text-sm">
      <div className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
