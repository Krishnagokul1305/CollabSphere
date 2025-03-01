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
        { accessorKey: "status", header: "Status" },
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
