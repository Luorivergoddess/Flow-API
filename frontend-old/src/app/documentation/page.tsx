"use client"

import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to integrate Flow-API into your applications
          </p>
        </div>
      </div>

      {/* Getting Started */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Welcome to the Flow-API documentation. Here you will find comprehensive guides and documentation to help you start working with Flow-API as quickly as possible.
          </p>
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Installation</h3>
          <p className="text-sm text-muted-foreground">
            Learn how to install and set up Flow-API in your project
          </p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">API Reference</h3>
          <p className="text-sm text-muted-foreground">
            Detailed API endpoints and usage examples
          </p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Examples</h3>
          <p className="text-sm text-muted-foreground">
            Code examples and use cases
          </p>
        </Card>
      </div>
    </div>
  )
}
