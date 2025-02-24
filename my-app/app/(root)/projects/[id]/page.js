import DataTable from "@/app/_components/table/Table";
import { tasks } from "@/app/lib/dummydata";

export default async function Page() {
  return (
    <div className="h-full flex-1 flex-col space-y-2  md:flex">
      <DataTable
        columnCofig={[
          { accessorKey: "id", header: "Id" },
          { accessorKey: "title", header: "Name" },
          { accessorKey: "assignee", header: "assignee" },
          { accessorKey: "dueDate", header: "Due" },
          { accessorKey: "status", header: "Status" },
          { accessorKey: "priority", header: "Priority" },
        ]}
        actionItems={[{ label: "copy", action: "hello" }]}
        data={tasks}
      />
    </div>
  );
}
