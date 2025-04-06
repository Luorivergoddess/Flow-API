"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { SidebarToggle } from "@/components/sidebar-toggle";
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
          <div className="flex min-h-screen relative">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 flex flex-col transition-all duration-300 ${
              isSidebarOpen ? 'w-56' : 'w-20'
            }`}>
              <div className={`flex items-center justify-between p-4 ${
                isSidebarOpen ? '' : 'justify-center'
              }`}>
                {isSidebarOpen && <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Flow-API</h2>}
                <SidebarToggle isOpen={isSidebarOpen} onClick={() => setSidebarOpen(!isSidebarOpen)} />
              </div>
              <nav className="space-y-2 p-4 pt-0">
                <Link href="/dashboard" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/dashboard' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <LayoutDashboard className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Dashboard'}
                </Link>
                <Link href="/services" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/services' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <CircuitBoard className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Services'}
                </Link>
                <Link href="/price" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/price' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <DollarSign className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Price'}
                </Link>
                <Link href="/chat" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/chat' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <MessageSquare className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Chat'}
                </Link>
                <Link href="/token" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/token' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <Scroll className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Token'}
                </Link>
                <Link href="/wallet" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/wallet' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <Wallet className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Wallet'}
                </Link>
                <Link href="/log" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/log' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <FileText className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Log'}
                </Link>
                <Link href="/settings" className={`flex items-center px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${currentPath === '/settings' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
                  <Settings className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                  {isSidebarOpen && 'Settings'}
                </Link>
              </nav>
              <div className={`mt-auto p-4 ${isSidebarOpen ? '' : 'flex justify-center'}`}>
                <ThemeToggleButton />
              </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-grow p-6 bg-background text-foreground transition-[margin] duration-300 ${
              isSidebarOpen ? 'ml-56' : 'ml-20'
            }`}>
              <div className="pt-12 lg:pt-0">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
