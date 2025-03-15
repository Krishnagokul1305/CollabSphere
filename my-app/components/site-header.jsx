"use client";

import { useState, useEffect } from "react";
import { Bell, Moon, SidebarIcon, Sun } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import NotificationSheet from "@/app/_components/notification/NotificationSheet";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import {
  getUserNotifications,
  hasUnreadNotifications,
} from "@/app/lib/data-service";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data } = useSession();
  let [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function getNotification() {
      setHasNotification(
        (await getUserNotifications(data?.user?.id)?.length) > 0
      );
    }
    getNotification();
  }, [data?.user?.id]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sidebar">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4 py-2">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex-1"></div>

        <div
          className="flex items-center gap-2 rounded-full p-2 cursor-pointer bg-sidebar-border relative"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted ? (
            resolvedTheme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )
          ) : null}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center gap-2 rounded-full p-2 cursor-pointer bg-sidebar-border relative">
              {hasNotification && (
                <span className="w-2 h-2 rounded-full bg-primary top-0 absolute right-0"></span>
              )}
              <Bell size={20} />
            </div>
          </SheetTrigger>
          <NotificationSheet userId={data?.user?.id} />
        </Sheet>
      </div>
    </header>
  );
}
