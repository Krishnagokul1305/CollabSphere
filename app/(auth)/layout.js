import { LayoutDashboard } from "lucide-react";
import Image from "next/image";

function layout({ children }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2" suppressHydrationWarning>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <LayoutDashboard className="size-4" />
            </div>
            CollabSphere.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden lg:block rounded-md">
        <Image
          src="https://www.collude.cloud/wp-content/uploads/2023/10/What-Tools-Can-Enhance-Team-Collaboration-and-Project-Management-in-a-Digital-Workspace-scaled.jpg"
          fill
          alt="Image"
          className="absolute bg-white inset-0 h-full w-full object-cover  dark:grayscale"
        />
      </div>
    </div>
  );
}

export default layout;
