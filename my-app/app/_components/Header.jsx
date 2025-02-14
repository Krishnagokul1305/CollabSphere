import { SidebarTrigger } from "@/components/ui/sidebar";

function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}

export default Header;
