import { getProjectStats } from "@/app/lib/data-service";
import ProjectChart from "./ProjectChart";

async function DashboardChart() {
  const data = await getProjectStats();
  return (
    <div className="h-full">
      <ProjectChart data={data} />
    </div>
  );
}

export default DashboardChart;
