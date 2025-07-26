import Tab from "@/app/_components/Tab";

export const metadata = {
  title: "CollabSphere | Profile",
  description: "Profile page of CollabSphere",
};

function layout({ children }) {
  return (
    <div className="max-w-7xl mx-auto md:px-3  space-y-5">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div>
        <Tab />
        <div className="bg-sidebar">{children}</div>
      </div>
    </div>
  );
}

export default layout;
