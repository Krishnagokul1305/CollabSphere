import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function page({ params }) {
  return (
    <div className="-b px-6 pb-3 space-y-3">
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

        {/* Avatars */}
        {/* <div className="flex -space-x-2">
          <Avatar>
            <AvatarImage src="/avatar1.png" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/avatar2.png" />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/avatar3.png" />
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <Avatar className="bg-muted text-sm flex items-center justify-center">
            +3
          </Avatar>
        </div> */}

        {/* Add Member Button */}
        <Button size="sm">+ Add member</Button>
      </div>
    </div>
  );
}

export default page;
