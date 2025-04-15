import { LayoutDashboard } from "lucide-react";

function Logo() {
  return (
    <a href="#" className="flex items-center gap- font-medium ">
      <div className="flex h-8 w-8 items-center justify-center rounded-md">
        <LayoutDashboard className="size-5" />
      </div>
      <span>CollabSphere</span>
    </a>
  );
}

export default Logo;
