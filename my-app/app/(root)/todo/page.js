import CreateUpdateTask from "@/app/_components/forms/CreateUpdateTask";
import CreateUpdateTodo from "@/app/_components/forms/CreateUpdateTodo";
import TodoList from "@/app/_components/list/TodoList";
import Modal from "@/app/_components/modal/Modal";
import DataTable from "@/app/_components/table/Table";
import { tableData } from "@/app/lib/dummydata";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3 flex flex-col md:flex-row  md:items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Hello Gokulakrishnan</h1>
          <p className="text-base text-gray-400">
            It&apos;s Monday 25 September 2025
          </p>
        </div>
        <Modal
          title="Create Task"
          description="Create a new task for this project."
          Trigger={<Button variant="primary">+ Add Task</Button>}
        >
          <CreateUpdateTodo />
        </Modal>
      </div>
      <div className=" rounded-md">
        <TodoList />
      </div>
    </div>
  );
}

export default page;
