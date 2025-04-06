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
      className="lg:hidden"
    >
      {isOpen ? (
        <XIcon className="h-6 w-6" />
      ) : (
        <MenuIcon className="h-6 w-6" />
      )}
    </Button>
  )
}
