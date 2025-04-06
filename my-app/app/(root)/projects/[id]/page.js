import { getProjectById } from "@/app/lib/data-service";
import { formatDateTime } from "@/app/utils/helper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, User } from "lucide-react";

export default async function Page(params) {
  const {
    params: { id },
  } = await params;
  const data = await getProjectById(id);
  if (!data) throw new Error("Project not found");
  return (
    <div className="space-y-6">
      <Card className="bg-sidebar border-none rounded-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold capitalize">
            {data.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7 md:space-y-0 grid grid-cols-1 md:flex md:items-center md:gap-3">
          <div className="grid grid-cols-1 md:flex space-y-3 md:space-y-0 gap-4 items-center text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>
                Created By:
                <span className="border rounded-full p-2 px-3 ms-2">
                  {data?.owner?.name}
                </span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:flex space-y-3 md:space-y-0 gap-4 items-center text-sm">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>
                Created date:
                <span className="border rounded-full p-2 px-3 ms-2">
                  {formatDateTime(data.createdAt).date}
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="bg-sidebar border-none rounded-md">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed capitalize">
            {data.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
