"use client"

import { useState } from 'react'
import { Copy, Plus, Trash2, Eye, EyeOff, Pencil } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import TokenForm from '@/components/token-form'

interface Token {
  id: string
  name: string
  token: string
  createdAt: Date
  lastUsed: Date | null
  expiresAt: Date | null
  quota: number | null
  usedQuota: number
  ipWhitelist: string[] | null
}

type TokenFormData = {
  name: string
  expiresAt: 'never' | '1h' | '1d' | '1m' | string
  quota: string
  quantity: string
  ipWhitelist: string
}

export default function TokenPage() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({})
  const [editingToken, setEditingToken] = useState<Token | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleFormSubmit = (formData: TokenFormData, existingToken?: Token) => {
    const now = new Date()
    let expiresAt: Date | null = null
    
    if (formData.expiresAt === 'never') {
      expiresAt = null
    } else if (['1h', '1d', '1m'].includes(formData.expiresAt)) {
      switch (formData.expiresAt) {
        case '1h':
          expiresAt = new Date(now.getTime() + 60 * 60 * 1000)
          break
        case '1d':
          expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
          break
        case '1m':
          expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
          break
      }
    } else {
      // Handle custom date
      expiresAt = new Date(formData.expiresAt)
    }

    if (existingToken) {
      // Update existing token
      setTokens(prev => prev.map(token => 
        token.id === existingToken.id 
          ? {
              ...token,
              name: formData.name,
              expiresAt,
              quota: formData.quota ? parseInt(formData.quota) : null,
              ipWhitelist: formData.ipWhitelist.trim() ? formData.ipWhitelist.split('\n').map(ip => ip.trim()) : null
            }
          : token
      ))
    } else {
      // Create new token(s)
      const tokenCount = parseInt(formData.quantity) || 1
      const newTokens: Token[] = Array.from({ length: tokenCount }, () => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        name: formData.name,
        token: `sk-${Math.random().toString(36).substring(2)}`,
        createdAt: now,
        lastUsed: null,
        expiresAt,
        quota: formData.quota ? parseInt(formData.quota) : null,
        usedQuota: 0,
        ipWhitelist: formData.ipWhitelist.trim() ? formData.ipWhitelist.split('\n').map(ip => ip.trim()) : null
      }))

      setTokens(prev => [...prev, ...newTokens])
    }
    
    // Close the sheet after submission
    if (existingToken) {
      setIsEditOpen(false)
    } else {
      setIsCreateOpen(false)
    }
  }

  const handleRevokeToken = (id: string) => {
    setTokens(prev => prev.filter(token => token.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleTokenVisibility = (id: string) => {
    setShowTokens(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">API Tokens</h1>
        <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Token
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New API Token</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <TokenForm
                onSubmit={(data) => handleFormSubmit(data)}
                onCancel={() => setIsCreateOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Quota</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map(token => (
              <TableRow key={token.id}>
                <TableCell>{token.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">
                      {showTokens[token.id] ? token.token : '••••••••••••••••'}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTokenVisibility(token.id)}
                    >
                      {showTokens[token.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(token.token)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {token.createdAt.toLocaleString('zh-CN', { hour12: false })}
                </TableCell>
                <TableCell>
                  {token.expiresAt ? token.expiresAt.toLocaleString('zh-CN', { hour12: false }) : 'Never'}
                </TableCell>
                <TableCell>
                  {token.quota ? `${token.usedQuota}/${token.quota}` : 'Unlimited'}
                </TableCell>
                <TableCell>
                  {token.lastUsed ? token.lastUsed.toLocaleString('zh-CN', { hour12: false }) : 'Never'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingToken(token)
                            setIsEditOpen(true)
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edit API Token</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <TokenForm
                            initialData={{
                              name: token.name,
                              expiresAt: token.expiresAt ? token.expiresAt.toISOString().slice(0, 16) : 'never',
                              quota: token.quota?.toString() ?? '',
                              quantity: '1',
                              ipWhitelist: token.ipWhitelist?.join('\n') ?? ''
                            }}
                            onSubmit={(data) => handleFormSubmit(data, token)}
                            onCancel={() => setIsEditOpen(false)}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRevokeToken(token.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
