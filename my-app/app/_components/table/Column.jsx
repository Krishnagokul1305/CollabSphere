"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import ReusableDropdown from "@/components/ReusableDropdown";

// Reusable Columns Function with Custom Actions
export function createColumns(columnsConfig, actionItems) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columnsConfig,
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <ReusableDropdown
            trigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            }
            label="Actions"
            items={actionItems?.map((item) => ({
              label: item.label,
              action: () => item.action(rowData),
              separator: item.separator || false,
            }))}
          />
        );
      },
    },
  ];
}
