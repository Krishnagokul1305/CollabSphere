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
import Modal from "@/app/_components/modal/Modal";
import DeleteModal from "@/app/_components/modal/DeleteModal";
import InviteUsersForm from "@/app/_components/forms/InviteUsersForm";

function layout({ children }) {
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3">
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
        <div className="flex gap-4 justify-between flex-col md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            Created on: <span className="text-foreground">Jan 8, 2024</span>
          </p>
          <Modal
            title=" Invite People to this Project"
            description="Invite existing team members or add new ones."
            Trigger={<Button variant="primary">+ Invite members</Button>}
          >
            <InviteUsersForm />
          </Modal>
          {/* <DeleteModal
            trigger={<Button variant="primary">+ Invite members</Button>}
          /> */}
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
