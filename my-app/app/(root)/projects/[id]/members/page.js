import DataTable from "@/app/_components/table/Table";
import { users } from "@/app/lib/dummydata";

function page() {
  return (
    <div>
      <DataTable
        data={users}
        columnCofig={[
          { accessorKey: "avatar", header: "Avatar" },
          { accessorKey: "name", header: "Name" },
          { accessorKey: "role", header: "Role" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "phone", header: "Phone" },
          { accessorKey: "status", header: "Status" },
        ]}
        actionItems={[{ label: "copy", action: "hello" }]}
      />
    </div>
  );
}

export default page;
