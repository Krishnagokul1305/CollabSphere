"use client";

import { useEffect, useState } from "react";
import UserList from "@/app/_components/list/UserList";
import Chat from "@/app/_components/Chat";

function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <div>{children}</div>;
  }

  return (
    <div className="space-y-5">
      {/* <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3 flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 rounded-md">
        <div className="rounded-md">
          <UserList />
        </div>
        <div className="rounded-md">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Layout;
