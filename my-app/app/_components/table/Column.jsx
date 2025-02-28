import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ReusableDropdown from "../ReusableDropdown";
import TableColumnHeader from "./TableHeaderItem";

export function createColumn(columnsConfig, actionItems = [], options = {}) {
  const {
    needCheckbox = true,
    enableSorting = true,
    enableFiltering = true,
  } = options;

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

    ...columnsConfig.map(
      ({
        accessorKey,
        header,
        customRender,
        enableSort = enableSorting,
        enableFilter = enableFiltering,
      }) => {
        return {
          accessorKey,
          header: ({ column }) => (
            <TableColumnHeader column={column} title={header} />
          ),
          cell: ({ row }) =>
            customRender ? (
              customRender(row.getValue(accessorKey), row)
            ) : (
              <div>{row.getValue(accessorKey)}</div>
            ),
          enableSorting: enableSort,
          enableFiltering: enableFilter,
        };
      }
    ),

    ...(actionItems.length > 0
      ? [
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
                  items={actionItems.map((item) => ({
                    label: item.label,
                    onClick: () => item.action(rowData),
                    separator: item.separator || false,
                  }))}
                />
              );
            },
          },
        ]
      : []),
  ];
}
