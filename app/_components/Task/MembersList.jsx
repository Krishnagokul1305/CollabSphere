"use client";

import { useRef, useState } from "react";
import DataTable from "../table/Table";
import DeleteModal from "../modal/DeleteModal";
import { removeMember } from "@/app/lib/actions/projectAction";

function MembersList({ data, isOwner = false, projectId }) {
  const deleteModalRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      {isOwner && (
        <DeleteModal
          ref={deleteModalRef}
          onDelete={async () => {
            if (selectedMember) {
              await removeMember(projectId, selectedMember._id);
            }
          }}
        />
      )}

      <DataTable
        data={data.members}
        columnCofig={[
          {
            accessorKey: "avatar",
            header: "Avatar",
            customRender: (value, row) => (
              <img
                src={row.original?.user?.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-18 h-8 rounded-md"
              />
            ),
          },
          {
            accessorKey: "name",
            header: "Name",
            customRender: (value, row) => row.original.user?.name || "N/A",
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
            customRender: (value) => (
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
        actionItems={
          isOwner
            ? [
                {
                  label: "Delete",
                  action: (row) => {
                    setSelectedMember(row);
                    deleteModalRef.current?.open();
                  },
                },
              ]
            : null
        }
        count={0}
      />
    </>
  );
}

export default MembersList;
