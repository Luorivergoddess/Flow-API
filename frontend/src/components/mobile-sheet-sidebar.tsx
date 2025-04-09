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

// 使用默认导航组件，以确保桌面端和移动端体验一致
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
 * 重写移动侧边栏，复用与桌面端相同的组件
 */
export function MobileSheetSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isMobile, isSm } = useMediaQuery();

  // 仅在移动设备上显示
  if (isMobile || isSm) {
    // 每个链接项点击时关闭侧边栏
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
            <span className="sr-only">切换导航菜单</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>导航菜单</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-full w-full flex-col">
              {/* 以下使用与桌面端相同的组件结构，只是添加点击事件处理 */}
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

  // 非移动设备返回一个空的占位元素
  return <div className="hidden" />;
}
