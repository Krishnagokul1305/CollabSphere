"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "../table/Table";
import Modal from "../modal/Modal";
import CreateProject from "../project/CreateProjectForm";
import { deleteProject } from "@/app/lib/actions/projectAction";
import { formatDateTime } from "@/app/utils/helper";

function ProjectList({ data }) {
  const router = useRouter();
  const modalRef = useRef(null);
  const [initialData, setInitialData] = useState(null);

  return (
    <div className="h-full bg-sidebar rounded-md flex-1 flex-col space-y-2 md:flex">
      <Modal
        ref={modalRef}
        title={initialData ? "Edit Project" : "Create Project"}
        description="Manage your project details"
      >
        <CreateProject initialData={initialData} />
      </Modal>

      <DataTable
        columnCofig={[
          { accessorKey: "name", header: "Name" },
          {
            accessorKey: "createdAt",
            header: "Created At",
            customRender: (value) => formatDateTime(value).date,
          },
          {
            accessorKey: "status",
            header: "Status",
            customRender: (value) => {
              const statusClasses = {
                completed: "bg-green-200 text-green-800",
                active: "bg-blue-200 text-blue-800",
                "on hold": "bg-yellow-200 text-yellow-800",
                inactive: "bg-red-200 text-red-800",
              };

              const indicatorClasses = {
                completed: "bg-green-500",
                active: "bg-blue-500",
                "on hold": "bg-yellow-600",
                inactive: "bg-red-500",
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
          {
            label: "View",
            action: (data) => router.push(`/projects/${data._id}`),
          },
          {
            label: "Update",
            action: (data) => {
              setInitialData(data);
              modalRef.current?.open();
            },
          },
          { label: "Delete", action: (data) => deleteProject(data._id) },
        ]}
        data={data}
      />
    </div>
  );
}

export default ProjectList;
