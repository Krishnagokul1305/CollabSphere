"use client";

import { Bell, Moon, SidebarIcon, Sun } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import NotificationSheet from "@/app/_components/notification/NotificationSheet";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { theme, setTheme, resolvedTheme } = useTheme();

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
          className="flex items-center ms-2 rounded-full p-2 justify-center cursor-pointer"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </div>

        {/* Notification */}
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center gap-2 rounded-full p-2 cursor-pointer">
              <Bell size={20} />
            </div>
          </SheetTrigger>
          <NotificationSheet />
        </Sheet>
      </div>
    </header>
  );
}
