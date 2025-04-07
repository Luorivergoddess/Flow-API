import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Check } from "lucide-react"

const features = [
  "Access to multiple AI models",
  "Simple API integration",
  "Flexible pricing options",
  "High-performance infrastructure",
  "Real-time monitoring",
  "24/7 support"
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <div className="py-20 text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Your Gateway to Advanced AI Services
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400">
          Access state-of-the-art AI models through a simple, unified API. Build smarter applications with ease.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/price">View Pricing</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
        {features.map((feature, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="font-medium">{feature}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <Card className="p-12 text-center space-y-6 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Join thousands of developers building amazing applications with our API.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Create Account</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
