"use client"

import { MenuIcon, XIcon } from "lucide-react"
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
      className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      {isOpen ? (
        <XIcon className="h-4 w-4" />
      ) : (
        <MenuIcon className="h-4 w-4" />
      )}
    </Button>
  )
}
