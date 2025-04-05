import EmptyList from "@/app/_components/EmptyList";
import ProjectList from "@/app/_components/list/ProjectList";
import Modal from "@/app/_components/modal/Modal";
import { Button } from "@/components/ui/button";
import CreateProject from "@/app/_components/project/CreateProjectForm";
import { getProjectcount, getProjects } from "@/app/lib/data-service";
import TableSearch from "@/app/_components/table/TableSearch";
import TableFilter from "@/app/_components/table/TableFilter";

async function page({ searchParams }) {
  const data = await getProjects(
    +searchParams?.page ?? 0,
    6,
    searchParams?.search,
    searchParams?.status
  );
  const count = await getProjectcount();
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3 flex flex-col md:flex-row  md:items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Modal
          title="Create Project"
          description="Add new Project to your list ."
          Trigger={<Button variant="primary">+ Create Project</Button>}
        >
          <CreateProject />
        </Modal>
      </div>

      <div className="flex rounded-md gap-4  items-center justify-between">
        <TableSearch />
        <TableFilter
          name="status"
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Completed", value: "completed" },
          ]}
        />
      </div>

      {data.length == 0 ? (
        <EmptyList
          count={0}
          title="No projects yet"
          message="There aren't any projects at the moment"
        />
      ) : (
        <ProjectList data={data} count={count} />
      )}
    </div>
  );
}

export default page;
