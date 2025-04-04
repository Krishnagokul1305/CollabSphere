import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import DashboardChart from "../_components/dashboard/DashboardChart";
import { Skeleton } from "@/components/ui/skeleton";
import Dashboardtask from "../_components/dashboard/Dashboardtask";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { getTodayCompletedTasks, getUpcomingTodos } from "../lib/data-service";
import Image from "next/image";
import ProgressChart from "../_components/dashboard/ProgressChart";
import Activity from "../_components/dashboard/Activity";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getTodayCompletedTasks(session.user.id);
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 ">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 rounded-md  border bg-sidebar relative">
              <Image
                src={"/wave.jpg"}
                alt="bg"
                fill
                className="object-cover opacity-10 grayscale "
              />
              <h2 className="text-2xl font-semibold">
                Hi, <span className="capitalize">{session.user.name}</span> !
              </h2>
              <p className="text-gray-400">
                Here&apos;s your progress for today
              </p>
              <ProgressChart data={data} />
            </div>

            <div className="grid grid-cols-1 h-full md:grid-cols-2 gap-4">
              <Suspense
                fallback={
                  <>
                    {" "}
                    {Array.from({ length: 4 }, (_, index) => 1).map((i) => (
                      <Skeleton key={i} className={"h-[140px]"} />
                    ))}
                  </>
                }
              >
                <Dashboardtask />
              </Suspense>
            </div>
          </div>

          <div className=" rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
            <Suspense fallback={<Skeleton className={"w-full h-[400px]"} />}>
              <DashboardChart />
            </Suspense>

            <Suspense
              fallback={<Skeleton className={"w-full h-[400px] col-span-2"} />}
            >
              <Activity />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
