"use client"

import { PanelLeftClose, PanelLeft } from "lucide-react"
import { Button } from "./ui/button"

interface SidebarToggleProps {
  isOpen: boolean
  onClick: () => void
}

export function SidebarToggle({ isOpen, onClick }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:shadow-md transition-all lg:hidden w-10 h-10"
    >
      {isOpen ? (
        <PanelLeftClose className="h-6 w-6" />
      ) : (
        <PanelLeft className="h-6 w-6" />
      )}
    </Button>
  )
}
