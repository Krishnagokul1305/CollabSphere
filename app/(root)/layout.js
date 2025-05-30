import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import QueryProvider from "@/components/query-provider";

export const metadata = {
  title: "CollabSphere",
  description: "A project management tool for teams",
};

function layout({ children }) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))] w-full relative">
      <QueryProvider>
        <SidebarProvider className="flex flex-col h-screen">
          <SiteHeader />
          <div className="flex flex-1 min-w-0">
            <AppSidebar />
            <SidebarInset className="flex-1 min-w-0">
              <main className="p-5 w-full overflow-auto">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </QueryProvider>
    </div>
  );
}

export default layout;
