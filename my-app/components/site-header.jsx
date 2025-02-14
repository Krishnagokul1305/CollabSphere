"use client";

import { Moon, SidebarIcon, Sun } from "lucide-react";

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

        <Button className="h-8 w-8" variant="ghost" size="icon">
          <Sun className="h-7 w-7 hidden dark:block" />
          <Moon className="h-7 w-7 dark:hidden" />
        </Button>
      </div>
    </header>
  );
}
