"use client"

import { useState, useEffect } from "react"
import { IconBook, IconFile } from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Quick start guide and basic usage examples",
    icon: IconBook,
    file: "/docs/getting-started.md",
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Complete API documentation with examples",
    icon: IconFile,
    file: "/docs/api-reference.md",
  },
  {
    id: "examples",
    title: "Examples",
    description: "Code examples for common use cases",
    icon: IconFile,
    file: "/docs/examples.md",
  },
]

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState(docSections[0].id)
  const [markdownContent, setMarkdownContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const activeSection = docSections.find((section) => section.id === activeTab)
    if (activeSection) {
      setIsLoading(true)
      fetch(activeSection.file)
        .then((response) => response.text())
        .then((text) => {
          setMarkdownContent(text)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error loading markdown:", error)
          setMarkdownContent("# Error\n\nFailed to load documentation content.")
          setIsLoading(false)
        })
    }
  }, [activeTab])

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
        <SiteHeader title="Documentation" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Documentation Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconBook className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Documentation</h1>
                    <p className="text-muted-foreground">
                      Learn how to integrate Flow-API into your applications
                    </p>
                  </div>
                </div>
                
                {/* Documentation Introduction */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Flow-API Documentation</CardTitle>
                    <CardDescription>
                      Select a section below to explore our comprehensive documentation
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                {/* Documentation Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {docSections.map((section) => (
                    <Card 
                      key={section.id}
                      className={`hover:shadow-md transition-all cursor-pointer ${
                        activeTab === section.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setActiveTab(section.id)}
                    >
                      <CardHeader className="flex flex-row items-center gap-2">
                        <section.icon className="h-5 w-5" />
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {section.description}
                          </CardDescription>
                        </div>
                        {activeTab === section.id ? (
                          <Badge className="ml-auto bg-primary">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="ml-auto opacity-50">
                            Select
                          </Badge>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                
                {/* Documentation Content */}
                <Card className="p-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <p>Loading documentation...</p>
                    </div>
                  ) : (
                    <MarkdownRenderer content={markdownContent} className="mt-2" />
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
