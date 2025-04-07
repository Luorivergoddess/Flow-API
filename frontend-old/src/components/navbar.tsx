"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { useAuth } from "@/hooks/use-auth"
import { 
  Home, 
  LayoutDashboard, 
  DollarSign, 
  BookOpen,
  Menu,
  User
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Navigation items for both desktop and mobile
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, requiresAuth: true },
  { href: "/price", label: "Pricing", icon: DollarSign },
  { href: "/documentation", label: "Docs", icon: BookOpen },
]

export function Navbar() {
  const { user, logout } = useAuth()
  
  return (
    <header className="fixed top-0 left-0 right-0 h-24 flex justify-between items-center px-6 z-50">
      {/* Left - Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xl font-bold lg:block hidden">Flow-API</span>
      </Link>

      {/* Center - Navigation (Desktop) */}
      <div className="hidden md:flex justify-center absolute left-1/2 transform -translate-x-1/2">
        <nav className="h-12 px-4 flex items-center gap-1 rounded-full border border-white/10 shadow-lg backdrop-blur-md bg-background/70">
          <div className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon, requiresAuth }) => {
              if (requiresAuth && !user) return null
              return (
                <Link
                  key={href}
                  href={href}
                className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all hover:scale-105"
              >
                <Icon className="w-4 h-4 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white" />
                  {label}
                </Link>
              )
            })}
          </div>
          <div className="h-6 w-[1px] mx-2 bg-border dark:bg-white/20 rounded-full"></div>
          <div className="flex items-center">
            <ThemeToggleButton />
          </div>
        </nav>
      </div>

      {/* Right - Auth & Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Navigation</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map(({ href, label, icon: Icon, requiresAuth }) => {
                  if (requiresAuth && !user) return null
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth Menu */}
        <div className="hidden md:block">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-4 p-2">
                  <p className="text-sm text-muted-foreground px-2">
                    {user.email}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout()
                      window.location.href = '/'
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
