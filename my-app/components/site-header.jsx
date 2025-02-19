"use client";

import { Bell, Dot, DotIcon, Moon, SidebarIcon, Sun } from "lucide-react";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import NotificationSheet from "@/app/_components/notification/NotificationSheet";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-sidebar">
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

        <div className="flex items-center ms-2 rounded-full p-2 justify-center cursor-pointer">
          <Sun className=" hidden dark:block" size={20} />
          <Moon className=" dark:hidden" size={20} />
        </div>
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
