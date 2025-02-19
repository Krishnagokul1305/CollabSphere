"use client";

import { List } from "lucide-react";

const EmptyList = ({ count, title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-5 min-h-[40vh] text-center">
      <div className="relative">
        <div className="p-5 w-24 h-24 flex items-center justify-center bg-sidebar rounded-full ">
          {/* Render the Icon as a component */}
          <List className="text-2xl" />
          {count >= 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-xs font-semibold px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </div>
      </div>
      <h2 className="text-lg font-semibold  mt-4">{title}</h2>
      <p className="text-gray-500 text-base mt-2">{message}</p>
    </div>
  );
};

export default EmptyList;
