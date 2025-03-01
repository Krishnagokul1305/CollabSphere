import Task from "@/app/_components/sheets/Task";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Bell } from "lucide-react";

export default async function Page() {
  return (
    <div className="h-full flex-1 flex-col space-y-2  md:flex">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center gap-2 rounded-full p-2 cursor-pointer">
            <Bell size={20} />
          </div>
        </SheetTrigger>
        <Task />
      </Sheet>
    </div>
  );
}
