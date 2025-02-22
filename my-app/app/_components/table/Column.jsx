import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";
import { TableColumnHeader } from "./TableColumnHeader"; // Import the TableColumnHeader component

export function createColumn(columnsConfig, actionItems, needCheckbox = true) {
  return [
    ...(needCheckbox
      ? [
          {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
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
        ]
      : []),

    ...columnsConfig.map(({ accessorKey, header }) => {
      if (accessorKey === "priority") {
        return {
          accessorKey,
          header: ({ column }) => (
            <TableColumnHeader column={column} title={header} />
          ),
          cell: ({ row }) => {
            const priority = row.getValue(accessorKey);
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
                      ? "bg-red-500"
                      : priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></span>
                {priority}
              </span>
            );
          },
        };
      }

      // Status Column
      if (accessorKey === "status") {
        return {
          accessorKey,
          header: ({ column }) => (
            <TableColumnHeader column={column} title={header} />
          ),
          cell: ({ row }) => {
            const status = row.getValue(accessorKey);
            const isActive = ["active", "completed"].includes(
              status?.toLowerCase()
            );
            return (
              <span
                className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${
                  isActive
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {/* <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span> */}
                {status}
              </span>
            );
          },
        };
      }

      // Avatar/Image Column
      if (accessorKey === "avatar" || accessorKey === "image") {
        return {
          accessorKey,
          header: ({ column }) => (
            <TableColumnHeader column={column} title={header} />
          ),
          cell: ({ row }) => {
            const imageUrl = row.getValue(accessorKey);
            return (
              <div className="flex items-center">
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            );
          },
        };
      }

      // Default Rendering for All Other Columns
      return {
        accessorKey,
        header: ({ column }) => (
          <TableColumnHeader column={column} title={header} />
        ),
        cell: ({ row }) => <div>{row.getValue(accessorKey)}</div>,
      };
    }),

    {
      id: "actions",
      header: "Actions",
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
