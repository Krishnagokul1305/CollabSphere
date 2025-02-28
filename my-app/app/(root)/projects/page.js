import EmptyList from "@/app/_components/EmptyList";
import CreateUpdateTodo from "@/app/_components/forms/CreateUpdateTodo";
import ProjectList from "@/app/_components/list/ProjectList";
import Modal from "@/app/_components/modal/Modal";
import { projects } from "@/app/lib/dummydata";
import { Button } from "@/components/ui/button";

function page() {
  const data = projects;
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3 flex flex-col md:flex-row  md:items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Modal
          title="Create Task"
          description="Add new Activity to do."
          Trigger={<Button variant="primary">+ Create Project</Button>}
        >
          <CreateUpdateTodo />
        </Modal>
      </div>
      {data.length == 0 ? (
        <EmptyList
          count={0}
          title="No projects yet"
          message="There aren't any projects at the moment"
        />
      ) : (
        <ProjectList data={data} />
      )}
    </div>
  );
}

export default page;
