"use client";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  { id: "details", label: "Details", url: "/profile/" },
  { id: "appearance", label: "Appearance", url: "/profile/appearance" },
];

function Tab() {
  const [activeTab, setActiveTab] = useState("details");
  return (
    <div className="border-b flex space-x-6">
      {tabs.map((tab) => (
        <Link
          href={tab.url}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-base font-medium transition text-gray-500 ${
            activeTab === tab.id
              ? "border-b-2 border-gray-400 text-gray-400"
              : "text-gray-500"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default Tab;
