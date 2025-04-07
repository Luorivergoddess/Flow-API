"use client"

import { Copy, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ModelPrice {
  name: string
  category: 'Chat' | 'Image' | 'Audio'
  inputPrice: number
  outputPrice: number
  context: number
  modelId: string
  billingType: 'Token' | 'Request'
}

const MODEL_PRICES: ModelPrice[] = [
  {
    name: "GPT-3.5 Turbo",
    category: "Chat",
    inputPrice: 0.0015,
    outputPrice: 0.002,
    context: 4096,
    modelId: "gpt-3.5-turbo",
    billingType: "Token"
  },
  {
    name: "GPT-4",
    category: "Chat",
    inputPrice: 0.03,
    outputPrice: 0.06,
    context: 8192,
    modelId: "gpt-4",
    billingType: "Token"
  },
  {
    name: "Claude 2",
    category: "Chat",
    inputPrice: 0.01,
    outputPrice: 0.03,
    context: 100000,
    modelId: "claude-2",
    billingType: "Token"
  },
  {
    name: "Stable Diffusion XL",
    category: "Image",
    inputPrice: 0.02,
    outputPrice: 0.04,
    context: 0,
    modelId: "sdxl",
    billingType: "Request"
  },
  {
    name: "Dall-E 3",
    category: "Image",
    inputPrice: 0.04,
    outputPrice: 0.08,
    context: 0,
    modelId: "dall-e-3",
    billingType: "Request"
  },
  {
    name: "Whisper",
    category: "Audio",
    inputPrice: 0.006,
    outputPrice: 0,
    context: 0,
    modelId: "whisper",
    billingType: "Token"
  }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Chat':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'Image':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case 'Audio':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    default:
      return ''
  }
}

export default function PricePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">API Pricing</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Transparent pricing for all models
        </p>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Model ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Context Length</TableHead>
              <TableHead>Billing Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MODEL_PRICES.map((model) => (
              <TableRow key={model.name}>
                <TableCell className="font-medium">
                  {model.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm relative rounded bg-muted px-[0.3rem] py-[0.2rem] cursor-pointer hover:bg-muted/70">
                      {model.modelId}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        navigator.clipboard.writeText(model.modelId)
                        toast({
                          title: `Copied: ${model.modelId}`,
                        })
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(model.category)}`}>
                    {model.category}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ArrowUpCircle className="w-4 h-4 text-red-500" />
                      <span className={`px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-300`}>
                        ${model.inputPrice.toFixed(4)}
                        <span className="opacity-75 ml-1">
                          {model.category !== "Image" ? "/ 1K tokens" : "/ image"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDownCircle className="w-4 h-4 text-green-500" />
                      <span className={`px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300`}>
                        ${model.outputPrice.toFixed(4)}
                        <span className="opacity-75 ml-1">
                          {model.category !== "Image" ? "/ 1K tokens" : "/ image"}
                        </span>
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {model.context > 0 ? (
                    <span className="text-sm">
                      {model.context.toLocaleString()} tokens
                    </span>
                  ) : '—'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    model.billingType === 'Token' 
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                      : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'
                  }`}>
                    {model.billingType === 'Token' ? 'Per Token' : 'Per Request'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Notes */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Important Notes</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <li>All prices are in USD</li>
          <li>Token counts are approximate and may vary based on the input text</li>
          <li>Image model prices are per image generation request</li>
          <li>Audio model prices are calculated based on input duration</li>
          <li>Volume discounts are available for enterprise customers</li>
        </ul>
      </Card>
    </div>
  )
}
