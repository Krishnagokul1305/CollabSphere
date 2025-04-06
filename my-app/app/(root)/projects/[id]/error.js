"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[40vh] border rounded-md bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground text-sm">
          {error.message || "We encountered an unexpected error."}
        </p>
        <Button onClick={() => reset()} className="mt-2">
          Try Again
        </Button>
      </div>
    </div>
  );
}
