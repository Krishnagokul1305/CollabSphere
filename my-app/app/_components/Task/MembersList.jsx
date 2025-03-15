"use client";

import DataTable from "../table/Table";

function MembersList({ data }) {
  console.log(data);
  return (
    <DataTable
      data={data.members}
      columnCofig={[
        {
          accessorKey: "avatar",
          header: "Avatar",
          customRender: (value, row) => (
            <img
              src={row.user?.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-18 h-8 rounded-md"
            />
          ),
        },
        {
          accessorKey: "name",
          header: "Name",
          customRender: (value, row) => {
            console.log(row, value);
            return row.original.user?.name || "N/A";
          },
        },
        { accessorKey: "role", header: "Role" },
        {
          accessorKey: "email",
          header: "Email",
          customRender: (value, row) => row.original.user?.email || "N/A",
        },
        {
          accessorKey: "phoneNo",
          header: "Phone",
          customRender: (value, row) => row.original.user?.phoneNo || "N/A",
        },
        {
          accessorKey: "status",
          header: "Status",
          customRender: (value, row) => (
            <div
              className={`rounded-md py-1 px-2 w-fit text-sm font-semibold ${
                value === "active"
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {value || "N/A"}
            </div>
          ),
        },
      ]}
      actionItems={[
        { label: "Edit", action: () => console.log("copy") },
        { label: "Update", action: () => console.log("copy") },
        { label: "Delete", action: () => console.log("copy") },
      ]}
    />
  );
}

export default MembersList;
