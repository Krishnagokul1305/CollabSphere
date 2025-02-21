"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReusableDropdown from "../ReusableDropdown";

const data = [
  {
    id: "task1",
    title: "Design homepage UI",
    status: "in progress",
    priority: "high",
    assignee: "john.doe@example.com",
    dueDate: "2024-09-10",
  },
  {
    id: "task2",
    title: "Fix login authentication bug",
    status: "pending",
    priority: "medium",
    assignee: "jane.smith@example.com",
    dueDate: "2024-09-15",
  },
  {
    id: "task3",
    title: "Implement payment gateway",
    status: "completed",
    priority: "high",
    assignee: "mike.jones@example.com",
    dueDate: "2024-08-30",
  },
  {
    id: "task4",
    title: "Optimize database queries",
    status: "in progress",
    priority: "low",
    assignee: "susan.white@example.com",
    dueDate: "2024-09-05",
  },
  {
    id: "task5",
    title: "Write API documentation",
    status: "pending",
    priority: "medium",
    assignee: "emma.brown@example.com",
    dueDate: "2024-09-20",
  },
  {
    id: "task3",
    title: "Implement payment gateway",
    status: "completed",
    priority: "high",
    assignee: "mike.jones@example.com",
    dueDate: "2024-08-30",
  },
];

export const columns = [
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
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task Title
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("assignee")}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      return (
        <span
          className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${
            priority === "high"
              ? "bg-red-200 text-red-800"
              : priority === "medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              priority === "high"
                ? "bg-red-500 "
                : priority === "medium"
                ? "bg-yellow-500 "
                : "bg-green-500 "
            }
          }`}
          ></span>
          {priority}
        </span>
      );
    },
  },

  {
    accessorKey: "dueDate",
    header: () => <div className="text-right">Due Date</div>,
    cell: ({ row }) => {
      const dueDate = new Date(row.getValue("dueDate")).toLocaleDateString();
      return <div className="text-right">{dueDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;

      return (
        <ReusableDropdown
          trigger={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          }
          label="Actions"
          items={[
            {
              label: "Copy Task ID",
              action: () => navigator.clipboard.writeText(task.id),
            },
            { separator: true },
            { label: "View Task", action: () => console.log("View Task") },
            { label: "Edit Task", action: () => console.log("Edit Task") },
            { label: "Delete Task", action: () => console.log("Delete Task") },
          ]}
        />
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="py-3 px-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="py-4 px-4 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-wrap text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
