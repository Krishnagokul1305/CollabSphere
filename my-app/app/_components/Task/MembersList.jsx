"use client";

import { users } from "@/app/lib/dummydata";
import DataTable from "../table/Table";

function MembersList() {
  return (
    <DataTable
      data={users}
      columnCofig={[
        {
          accessorKey: "avatar",
          header: "Avatar",
          customRender: (value) => {
            return (
              <img src={value} alt="avatar" className="w-18 h-8 rounded-md" />
            );
          },
        },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phone", header: "Phone" },
        {
          accessorKey: "status",
          header: "Status",
          customRender: (value) => {
            return (
              <div
                className={`rounded-md py-1 px-2 w-fit text-sm font-semibold ${
                  value === "Active"
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {value}
              </div>
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
    />
  );
}

export default MembersList;
