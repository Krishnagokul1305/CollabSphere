import { SidebarInset } from "@/components/ui/sidebar";
import DashBoardCard from "../_components/dashboard/DashBoardCard";
import { DollarSign, Users } from "lucide-react";
import ProjectChart from "../_components/dashboard/ProjectChart";

export default async function Page() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: <DollarSign size={17} />,
    },
    {
      label: "Subscriptions",
      value: "+2,350",
      change: "+180.1% from last month",
      icon: <Users size={17} />,
    },
    {
      label: "Sales",
      value: "+12,234",
      change: "+19% from last month",
      icon: "💳",
    },
    {
      label: "Active Now",
      value: "+573",
      change: "+201 since last hour",
      icon: "📈",
    },
  ];

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 rounded-md bg-muted/50 border">
              <h2 className="text-2xl font-semibold">Hi, Gokulakrishnan!</h2>
              <p className="text-gray-400">
                Here's what's happening with your projects today:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <DashBoardCard key={index} data={stat} label={stat.label} />
              ))}
            </div>
          </div>

          {/* Full-width Section */}
          <div className=" rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProjectChart />

            <div className="p-6 rounded-md md:col-span-2 bg-muted/50 border">
              <h2 className="text-lg font-semibold">Recently Added Tasks</h2>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
