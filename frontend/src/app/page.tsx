import Image from "next/image";
import { 
  IconKey, 
  IconDashboard, 
  IconFileCode, 
  IconLock, 
  IconWallet, 
  IconBookmarks, 
  IconUserCheck 
} from "@tabler/icons-react";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Flow-API" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center py-16 px-4 lg:px-6 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                One API, Connect All Services
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
                Flow-API is a powerful API aggregation platform that provides a unified interface to access multiple third-party services, simplifying integration, reducing complexity, and saving valuable development time.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button size="lg" asChild>
                  <a href="/dashboard">Get Started</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/documentation">View Docs</a>
                </Button>
              </div>
            </section>

            <Separator className="mx-4 lg:mx-6" />

            {/* Key Features Section */}
            <section className="py-12 px-4 lg:px-6">
              <h2 className="text-2xl font-semibold mb-8 text-center">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <Card className="@container/card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconKey className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Unified API Access</CardTitle>
                    <CardDescription>
                      Say goodbye to provider-specific SDKs and authentication methods. Interact with diverse services using a single, standardized Flow-API endpoint.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Feature 2 */}
                <Card className="@container/card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconLock className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Centralized Key Management</CardTitle>
                    <CardDescription>
                      Securely store and manage your API keys from various providers within your Flow-API account. No more scattering sensitive credentials.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Feature 3 */}
                <Card className="@container/card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Intuitive Dashboard</CardTitle>
                    <CardDescription>
                      Get a clear overview of your connected services, monitor API usage, track spending, and manage settings through a clean web interface.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Feature 4 */}
                <Card className="@container/card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconWallet className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Wallet & Token System</CardTitle>
                    <CardDescription>
                      Manage your Flow-API balance, purchase credits (tokens), and monitor costs associated with your API usage across all connected services.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Feature 5 */}
                <Card className="@container/card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconBookmarks className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Integrated Documentation</CardTitle>
                    <CardDescription>
                      Access clear, concise documentation for the Flow-API platform and integrated third-party services, all in one place.
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Feature 6 */}
                <Card className="@container/card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconUserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Secure User Authentication</CardTitle>
                    <CardDescription>
                      Robust login and registration system to protect your account and API keys.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>

            <Separator className="mx-4 lg:mx-6" />

            {/* Tech Stack Section */}
            <section className="py-12 px-4 lg:px-6">
              <h2 className="text-2xl font-semibold mb-8 text-center">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Frontend Tech */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frontend (Current)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><span className="font-medium">Framework:</span> Next.js (v15+ with Turbopack)</li>
                      <li><span className="font-medium">Language:</span> TypeScript</li>
                      <li><span className="font-medium">UI Library:</span> React (v19)</li>
                      <li><span className="font-medium">Styling:</span> Tailwind CSS (v4)</li>
                      <li><span className="font-medium">Components:</span> Radix UI Primitives & shadcn/ui</li>
                      <li><span className="font-medium">State Management:</span> Zustand</li>
                      <li><span className="font-medium">Icons:</span> Lucide React</li>
                      <li><span className="font-medium">Theming:</span> next-themes</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Backend Tech */}
                <Card>
                  <CardHeader>
                    <CardTitle>Backend (Planned)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><span className="font-medium">Language:</span> Go (Golang)</li>
                      <li className="text-muted-foreground italic">Chosen for its performance, concurrency, and strong standard library, ideal for scalable backend services.</li>
                      <li className="text-muted-foreground">(Specific libraries/frameworks TBD)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="mx-4 lg:mx-6" />

            {/* Getting Started Section */}
            <section className="py-12 px-4 lg:px-6 mb-8">
              <h2 className="text-2xl font-semibold mb-8 text-center">Getting Started</h2>
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>Run Frontend Locally</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <span className="font-medium">Prerequisites:</span> Make sure you have Node.js (v20 or newer recommended) and pnpm installed.
                    </li>
                    <li>
                      <span className="font-medium">Clone the Repository:</span>
                      <pre className="bg-secondary p-2 rounded-md mt-1 overflow-x-auto">
                        <code>git clone https://github.com/Luorivergoddess/Flow-API.git; cd Flow-API</code>
                      </pre>
                    </li>
                    <li>
                      <span className="font-medium">Navigate to Frontend Directory:</span>
                      <pre className="bg-secondary p-2 rounded-md mt-1 overflow-x-auto">
                        <code>cd frontend</code>
                      </pre>
                    </li>
                    <li>
                      <span className="font-medium">Install Dependencies:</span>
                      <pre className="bg-secondary p-2 rounded-md mt-1 overflow-x-auto">
                        <code>pnpm install</code>
                      </pre>
                    </li>
                    <li>
                      <span className="font-medium">Run Development Server:</span>
                      <pre className="bg-secondary p-2 rounded-md mt-1 overflow-x-auto">
                        <code>pnpm run dev</code>
                      </pre>
                    </li>
                    <li>
                      <span className="font-medium">Open Your Browser:</span> Navigate to <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a>. You should see the Flow-API frontend running!
                    </li>
                  </ol>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href="/documentation">View Full Documentation</a>
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
