"use client";

import * as React from "react";
import {
  BookText,
  Dog,
  Map,
  Music4,
  PieChart,
  TvMinimalPlay,
} from "lucide-react";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppHeader } from "./app-header";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  options: [
    {
      name: "Books",
      url: "/home/books",
      icon: BookText,
    },
    {
      name: "Movies",
      url: "/home/movies",
      icon: TvMinimalPlay,
    },
    {
      name: "Pets",
      url: "/home/pets",
      icon: Dog,
    },
    {
      name: "Songs",
      url: "/home/songs",
      icon: Music4,
    },
    {
      name: "Sales & Marketing",
      url: "/home/marketing",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.options} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
