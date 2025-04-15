"use client";

import { formatDateTime } from "@/app/utils/helper";
import DataTable from "../table/Table";

function ActivityList({ data }) {
  return (
    <DataTable
      data={data}
      columnCofig={[
        {
          accessorKey: "description",
          header: "Title",
        },
        {
          accessorKey: "date_time",
          header: "Due Date",
          customRender: (value) => {
            return (
              formatDateTime(value).date + " " + formatDateTime(value).time
            );
          },
        },
        {
          accessorKey: "status",
          header: "Status",
        },
        {
          accessorKey: "priority",
          header: "Priority",
          customRender: (value) => (
            <div
              className={`rounded-md py-1 px-2 w-fit text-sm font-semibold ${
                value === "low"
                  ? "bg-green-200 text-blue-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {value || "N/A"}
            </div>
          ),
        },
        {
          accessorKey: "status",
          header: "Status",
          customRender: (value) => (
            <div
              className={`rounded-md py-1 px-2 w-fit text-sm font-semibold ${
                value === "completed"
                  ? "bg-green-200 text-blue-700"
                  : value === "pending"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {value || "N/A"}
            </div>
          ),
        },
      ]}
      isNeededPagination={false}
    />
  );
}

export default ActivityList;
