"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/hooks/use-auth";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { NavItem } from "@/components/nav-item";
import { 
  LayoutDashboard, 
  Settings, 
  MessageSquare, 
  Wallet, 
  Scroll, 
  FileText,
  DollarSign,
  CircuitBoard
} from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    setCurrentPath(pathname || '');
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Gradient mask */}
          <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-background to-background/0 dark:from-background dark:to-background/0 z-40" />
          
          <Navbar />
          <div className="flex min-h-screen relative pt-4">
            {/* Sidebar - Only show when user is logged in */}
            {user && (
              <aside className={`fixed top-0 left-0 h-screen bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-sm border-r border-zinc-200 dark:border-zinc-700 flex flex-col transition-all duration-300 pt-28 ${
                isSidebarOpen ? 'w-56' : 'w-14'
              }`}>
                <div className={`flex items-center justify-between px-2 py-4 ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}>
                  <SidebarToggle isOpen={isSidebarOpen} onClick={() => setSidebarOpen(!isSidebarOpen)} />
                </div>
                <nav className="space-y-2 px-1 pt-0">
                  <NavItem
                    href="/dashboard"
                    icon={LayoutDashboard}
                    label="Dashboard"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/dashboard'}
                  />
                  <NavItem
                    href="/services"
                    icon={CircuitBoard}
                    label="Services"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/services'}
                  />
                  <NavItem
                    href="/chat"
                    icon={MessageSquare}
                    label="Chat"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/chat'}
                  />
                  <NavItem
                    href="/token"
                    icon={Scroll}
                    label="Token"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/token'}
                  />
                  <NavItem
                    href="/wallet"
                    icon={Wallet}
                    label="Wallet"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/wallet'}
                  />
                  <NavItem
                    href="/log"
                    icon={FileText}
                    label="Log"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/log'}
                  />
                  <NavItem
                    href="/settings"
                    icon={Settings}
                    label="Settings"
                    isOpen={isSidebarOpen}
                    isActive={currentPath === '/settings'}
                  />
                </nav>
              </aside>
            )}

            {/* Main Content */}
            <main className={`flex-grow p-6 pt-24 bg-background text-foreground transition-[margin] duration-300 ${
              user && isSidebarOpen ? 'ml-56' : user ? 'ml-14' : 'ml-0'
            }`}>
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
