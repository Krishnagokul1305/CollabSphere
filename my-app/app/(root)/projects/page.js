import { Button } from "@/components/ui/button";

function page() {
  return (
    <div>
      <div className="flex justify-between  items-center mb-6 py-3 px-5 rounded-md">
        <h1 className="text-lg font-bold">Projects</h1>
        <Button>Add Project</Button>
      </div>
    </div>
  );
}

export default page;
