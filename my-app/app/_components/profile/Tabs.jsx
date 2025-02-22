"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Tabs = ({ projectId }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current URL path
  const [activeTab, setActiveTab] = useState("/");

  // Update active tab based on URL
  useEffect(() => {
    if (pathname.includes("members")) {
      setActiveTab("members");
    } else {
      setActiveTab("/");
    }
  }, [pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/projects/${projectId}/${tab}`);
  };

  return (
    <div className="flex space-x-4 p-2 w-fit ">
      <Tab
        label="Tasks"
        isActive={activeTab === "/"}
        onClick={() => handleTabChange("/")}
      />
      <Tab
        label="Members"
        isActive={activeTab === "members"}
        onClick={() => handleTabChange("members")}
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
