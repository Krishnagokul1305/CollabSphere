import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Tabs from "@/app/_components/profile/Tabs";
import Modal from "@/app/_components/Modal";

function layout({ children }) {
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-6 pb-3 bg-sidebar space-y-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects/timmy-saas">
                Timmy - SaaS Website
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold">Timmy - SaaS Website</h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 justify-between">
          <p className="text-sm text-muted-foreground">
            Created on: <span className="text-foreground">Jan 8, 2024</span>
          </p>
          <Modal
            title="Delete Item"
            description="Are you sure you want to delete this?"
            isDelete={true}
            // onDelete={() => console.log("Deleted")}
            Trigger={<Button variant="primary">+ Invite members</Button>}
          />
        </div>
      </div>
      <div className=" gap-5 ">
        <div className="space-y-5">
          <div className="bg-sidebar flex items-center justify-between rounded-md">
            <div>
              <Tabs />
            </div>
            <Button className="me-3 bg-black text-white">Filter</Button>
          </div>
          <main className="bg-sidebar rounded-md">{children}</main>
        </div>
        {/* <div className="bg-sidebar rounded-md">
          <UserList />
        </div> */}
      </div>
    </div>
  );
}

export default layout;
