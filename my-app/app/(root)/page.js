import { SidebarInset } from "@/components/ui/sidebar";

export default async function Page() {
  // const { userId } = await auth();
  // if (!userId) {
  //   return <div>Sign in to view this page</div>;
  // }

  // const user = await currentUser();
  // console.log(user);
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </div>
  );
}
