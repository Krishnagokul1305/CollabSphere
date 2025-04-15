import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, FileText } from "lucide-react";
import { getTaskById } from "@/app/lib/data-service";
import EmptyList from "@/app/_components/EmptyList";
import { formatDateTime } from "@/app/utils/helper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { markTaskAsCompleted } from "@/app/lib/actions/taskAction";
import CompleteButton from "@/app/_components/CompleteButton";
import Link from "next/link";

const users = [
  {
    id: "1",
    name: "Lincoln Philips",
    email: "lincolnphilips@gmail.com",
    status: "Completed",
  },
  {
    id: "2",
    name: "Cooper Kenter",
    email: "cooperkenter@gmail.com",
    status: "Pending",
  },
  {
    id: "3",
    name: "Ann Baptista",
    email: "annbaptista56@gmail.com",
    status: "Completed",
  },
  {
    id: "4",
    name: "Cristofer Press",
    email: "cristoferpress@gmail.com",
    status: "Pending",
  },
];

async function Page({ params }) {
  const { taskid } = await params;
  const currentUserId = (await getServerSession(authOptions))?.user?.id;

  const data = await getTaskById(taskid);
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-sidebar border-none rounded-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold capitalize">
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Dates */}
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
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>
                Due date:
                <span className="border rounded-full p-2 px-3 ms-2">
                  {formatDateTime(data.dueDate).date}
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

      {/* File Attachments */}
      <Card className="bg-sidebar border-none rounded-md">
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.attachment ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex justify-between items-center space-x-3 border p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6" />
                  <a
                    href={data.attachment}
                    target="__blank"
                    className="text-sm"
                  >
                    <p className="truncate w-44">Attachment</p>
                    <p className="text-xs text-gray-500 truncate w-44">
                      {data.attachment.split("/").pop()}
                    </p>
                  </a>
                </div>
                <a
                  href={data.attachment}
                  download
                  target="__blank"
                  className="cursor-pointer flex items-center justify-center hover:bg-muted/50 p-2 rounded-full"
                >
                  <span>
                    <Download />
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <EmptyList message={"No attachments found."} count={0} />
          )}
        </CardContent>
      </Card>

      {/* Assigned Users */}
      {data?.members?.length > 0 && (
        <Card className="bg-sidebar border-none rounded-md">
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.members?.map((member) => (
                <div
                  key={member?._id}
                  className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 bg-white rounded-full"
                      src={member?.avatar}
                    />

                    <div>
                      <p className="font-medium">{member?.name}</p>
                      <p className="text-xs text-gray-500">{member?.email}</p>
                    </div>
                  </div>

                  {/* Status & Button */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${
                        member?.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {member?.status}
                    </span>

                    {!data?.completedMembers?.includes(member._id) &&
                      member?._id === currentUserId && (
                        <CompleteButton
                          taskId={taskid}
                          memberId={currentUserId}
                        />
                      )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Page;
