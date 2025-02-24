"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  GroupIcon,
  LayoutDashboard,
  LifeBuoy,
  ListCheck,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  User2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSettings } from "@/components/nav-settings";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Bot,
    },
    {
      title: "Discussions",
      url: "/chat",
      icon: GroupIcon,
    },
    {
      title: "Todo",
      url: "/todo",
      icon: ListCheck,
    },
  ],

  settings: [
    {
      name: "Profile",
      url: "/profile",
      icon: User2,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      className="top-[--header-height] border-t !h-[calc(100svh-var(--header-height))] mt-5 rounded-r-md"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSettings projects={data.settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
