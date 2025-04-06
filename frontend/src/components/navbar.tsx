"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { 
  Home, 
  LayoutDashboard, 
  DollarSign, 
  BookOpen,
  Menu
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

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
        <span className="text-xl font-bold">Flow-API</span>
      </Link>

      {/* Center - Navigation (Desktop) */}
      <div className="hidden md:flex justify-center flex-grow">
        <nav className="h-12 px-4 flex items-center gap-1 rounded-full border border-white/10 shadow-lg backdrop-blur-md bg-background/70">
          {navItems.map(({ href, label, icon: Icon, requiresAuth }) => {
            if (requiresAuth && !user) return null
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-all hover:scale-105"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right - Auth & Menu */}
      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        
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

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout()
                  window.location.href = '/'
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
