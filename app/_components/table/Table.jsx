"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { createColumn } from "./Column";
import DataTableHeader from "./TableHeader";
import DataTableBody from "./TableBody";
import TablePagination from "./TablePagination";
import BulkActions from "./BulkActions";

export default function DataTable({
  columnCofig,
  actionItems,
  count,
  data,
  isNeededHeader = true,
  isNeededPagination = true,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: createColumn(columnCofig, actionItems),
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
    <div>
      {/* <BulkActions /> */}
      <Table>
        {isNeededHeader && <DataTableHeader table={table} />}
        <DataTableBody table={table} />
      </Table>
      {isNeededPagination && <TablePagination table={table} count={count} />}
    </div>
  );
}
