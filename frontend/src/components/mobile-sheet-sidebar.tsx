"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { data } from "@/components/app-sidebar";

// Use default navigation components to ensure consistent experience between desktop and mobile
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavDocuments } from "@/components/nav-documents";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

/**
 * Rewrite mobile sidebar, reusing the same components as the desktop version
 */
export function MobileSheetSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isMobile, isSm } = useMediaQuery();

  // Only display on mobile devices
  if (isMobile || isSm) {
    // Close sidebar when each link item is clicked
    const handleLinkClick = () => setOpen(false);
    
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-full w-full flex-col">
              {/* Use the same component structure as the desktop version below, just add click event handling */}
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="data-[slot=sidebar-menu-button]:!p-1.5"
                    >
                      <a href="#" onClick={handleLinkClick}>
                        <IconInnerShadowTop className="!size-5" />
                        <span className="text-base font-semibold">Acme Inc.</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              
              <SidebarContent className="flex-1">
                {/* Directly use the navigation components */}
                <NavMain items={data.navMain} onItemClick={handleLinkClick} />
                <NavDocuments items={data.documents} onItemClick={handleLinkClick} />
                <NavSecondary items={data.navSecondary} className="mt-auto" onItemClick={handleLinkClick} />
              </SidebarContent>
              
              <SidebarFooter>
                <NavUser user={data.user} />
              </SidebarFooter>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  // Return an empty placeholder element for non-mobile devices
  return <div className="hidden" />;
}
