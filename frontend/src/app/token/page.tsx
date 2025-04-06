"use client"

import { useState } from 'react'
import { Copy, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

interface Token {
  id: string
  name: string
  token: string
  createdAt: Date
  lastUsed: Date | null
}

export default function TokenPage() {
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: '1',
      name: 'Development API Key',
      token: 'sk-xxxx-xxxx-xxxx-xxxx',
      createdAt: new Date('2024-04-01'),
      lastUsed: new Date('2024-04-05'),
    }
  ])
  const [newTokenName, setNewTokenName] = useState('')
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({})

  const handleCreateToken = () => {
    if (!newTokenName.trim()) return

    const newToken: Token = {
      id: Date.now().toString(),
      name: newTokenName,
      token: `sk-${Math.random().toString(36).substring(2)}`,
      createdAt: new Date(),
      lastUsed: null
    }

    setTokens(prev => [...prev, newToken])
    setNewTokenName('')
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
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Create New API Token</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="token-name">Token Name</Label>
            <div className="flex gap-2 mt-1.5">
              <Input
                id="token-name"
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
                placeholder="e.g. Development API Key"
              />
              <Button onClick={handleCreateToken} disabled={!newTokenName.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">API Tokens</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Created</TableHead>
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
                  {token.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {token.lastUsed ? token.lastUsed.toLocaleDateString() : 'Never'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRevokeToken(token.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
