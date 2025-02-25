import EmptyList from "@/app/_components/EmptyList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <div>
      <div className="flex justify-between  items-center mb-6 py-3 px-5 rounded-md w-full overflow-x-hidden">
        <h1 className="text-lg font-bold">Projects</h1>
        <Link href={"/projects/timmy-sass"}>Add Project</Link>
      </div>
      <EmptyList
        count={0}
        title="No projects yet"
        message="There aren't any projects at the moment"
      />
    </div>
  );
}

export default page;
