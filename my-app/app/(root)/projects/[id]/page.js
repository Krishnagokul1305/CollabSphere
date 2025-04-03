import { getProjectById } from "@/app/lib/data-service";

export default async function Page(params) {
  const {
    params: { id },
  } = await params;
  const data = await getProjectById(id);

  return <div className="h-full flex-1 flex-col space-y-2  md:flex"></div>;
}
