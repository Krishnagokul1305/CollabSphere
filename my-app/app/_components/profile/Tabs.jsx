"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Tabs = ({ projectId }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current URL path
  const [activeTab, setActiveTab] = useState("members");

  // Update active tab based on URL
  useEffect(() => {
    if (pathname.includes("members")) {
      setActiveTab("members");
    } else if (pathname.includes("table")) {
      setActiveTab("table");
    } else {
      setActiveTab("kanban");
    }
  }, [pathname]);

  // Handle tab change and update the URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update the URL by pushing the new query or path
    router.push(`/projects/${projectId}/${tab}`);
  };

  return (
    <div className="flex space-x-4 p-2 w-fit ">
      <Tab
        label="Members"
        isActive={activeTab === "members"}
        onClick={() => handleTabChange("members")}
      />
      <Tab
        label="List view"
        isActive={activeTab === "list"}
        onClick={() => handleTabChange("list")}
      />
      <Tab
        label="Table view"
        isActive={activeTab === "table"}
        onClick={() => handleTabChange("table")}
      />
    </div>
  );
};

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
        isActive
          ? "bg-black text-white"
          : "bg-black text-gray-200 hover:bg-black/40 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default Tabs;
