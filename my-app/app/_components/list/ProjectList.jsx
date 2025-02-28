"use client";

import { useRouter } from "next/navigation";
import DataTable from "../table/Table";

function ProjectList({ data }) {
  const router = useRouter();
  return (
    <div className="h-full bg-sidebar rounded-md flex-1 flex-col space-y-2 md:flex">
      <DataTable
        columnCofig={[
          { accessorKey: "title", header: "Name" },
          { accessorKey: "createdAt", header: "Created At" },
          {
            accessorKey: "status",
            header: "Status",
            customRender: (value) => {
              const statusClasses = {
                completed: "bg-green-200 text-green-800",
                ongoing: "bg-blue-200 text-blue-800",
                "on hold": "bg-yellow-200 text-yellow-800",
                canceled: "bg-red-200 text-red-800",
              };

              const indicatorClasses = {
                completed: "bg-green-500",
                ongoing: "bg-blue-500",
                "on hold": "bg-yellow-600",
                canceled: "bg-red-500",
              };

              return (
                <span
                  className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${
                    statusClasses[value] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      indicatorClasses[value] || "bg-gray-500"
                    }`}
                  ></span>
                  {value}
                </span>
              );
            },
          },
        ]}
        actionItems={[
          { label: "view", action: () => router.push("/projects/1") },
          { label: "Edit", action: () => console.log("copy") },
          { label: "Update", action: () => console.log("copy") },
          { label: "Delte", action: () => console.log("copy") },
        ]}
        data={data}
      />
    </div>
  );
}

export default ProjectList;
