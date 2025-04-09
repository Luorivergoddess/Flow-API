"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  IconChartBar,
  IconChevronLeft,
  IconChevronRight,
  IconCircuitBattery,
  IconDashboard,
  IconDatabase,
  IconFileText,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconMessageShare,
  IconReport,
  IconNote,
  IconSearch,
  IconSettings,
  IconUsers,
  IconWallet
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Services",
      url: "/services",
      icon: IconCircuitBattery,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: IconMessageShare,
    },
    {
      title: "Token",
      url: "/token",
      icon: IconNote,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: IconWallet,
    },
    {
      title: "Logs",
      url: "/logs",
      icon: IconFileText,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(!isTablet);

  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Adjust sidebar state based on device responsiveness
  React.useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <Sidebar 
      collapsible="icon"
      data-state={isSidebarExpanded ? "expanded" : "collapsed"}
      className={isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]"}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
