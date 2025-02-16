"use client";

import { Dot, DotIcon, Moon, SidebarIcon, Sun } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

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
        <UserButton userProfileUrl="/profile" />

        <div className="flex items-center ms-2 justify-center cursor-pointer">
          <Sun className=" hidden dark:block" size={25} />
          <Moon className=" dark:hidden" size={25} />
        </div>
      </div>
    </header>
  );
}
