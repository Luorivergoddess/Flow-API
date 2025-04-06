"use client"

import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface NavItemProps {
  href: string
  icon: LucideIcon
  label: string
  isOpen: boolean
  isActive: boolean
}

export function NavItem({ href, icon: Icon, label, isOpen, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-2 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
        isOpen ? '' : 'justify-center'
      } ${isActive ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}
    >
      <Icon className={`w-6 h-6 ${isOpen ? 'mr-3' : ''}`} />
      {isOpen && label}
    </Link>
  )
}
