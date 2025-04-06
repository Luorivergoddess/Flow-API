"use client"

import { useState, useEffect } from 'react'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface TokenFormData {
  name: string
  expiresAt: 'never' | '1h' | '1d' | '1m' | string
  quota: string
  quantity: string
  ipWhitelist: string
}

interface TokenFormProps {
  initialData?: TokenFormData
  onSubmit: (data: TokenFormData) => void
  onCancel: () => void
}

export default function TokenForm({ initialData, onSubmit, onCancel }: TokenFormProps) {
  const [formData, setFormData] = useState<TokenFormData>(
    initialData || {
      name: '',
      expiresAt: 'never',
      quota: '',
      quantity: '1',
      ipWhitelist: '',
    }
  )
  const [customExpiry, setCustomExpiry] = useState<string>('')
  const [showCustomExpiry, setShowCustomExpiry] = useState(false)

  // Initialize customExpiry if provided in initialData
  useEffect(() => {
    if (initialData?.expiresAt && !['never', '1h', '1d', '1m'].includes(initialData.expiresAt)) {
      setCustomExpiry(initialData.expiresAt)
      setShowCustomExpiry(true)
    }
  })

  const handleSubmit = () => {
    if (!formData.name.trim()) return
    onSubmit(formData)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="token-name">Token Name</Label>
        <Input
          id="token-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Development API Key"
          className="mt-1.5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiration">Expiration</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
              variant={!showCustomExpiry && formData.expiresAt === 'never' ? 'default' : 'outline'}
            onClick={() => {
              setFormData({ ...formData, expiresAt: 'never' })
              setShowCustomExpiry(false)
            }}
            size="sm"
          >
            Never Expires
          </Button>
          <Button
            type="button"
              variant={!showCustomExpiry && formData.expiresAt === '1h' ? 'default' : 'outline'}
            onClick={() => {
              setFormData({ ...formData, expiresAt: '1h' })
              setShowCustomExpiry(false)
            }}
            size="sm"
          >
            1 Hour
          </Button>
          <Button
            type="button"
              variant={!showCustomExpiry && formData.expiresAt === '1d' ? 'default' : 'outline'}
            onClick={() => {
              setFormData({ ...formData, expiresAt: '1d' })
              setShowCustomExpiry(false)
            }}
            size="sm"
          >
            1 Day
          </Button>
          <Button
            type="button"
              variant={!showCustomExpiry && formData.expiresAt === '1m' ? 'default' : 'outline'}
            onClick={() => {
              setFormData({ ...formData, expiresAt: '1m' })
              setShowCustomExpiry(false)
            }}
            size="sm"
          >
            1 Month
          </Button>
          <Button
            type="button"
            variant={showCustomExpiry ? 'default' : 'outline'}
            onClick={() => setShowCustomExpiry(true)}
            size="sm"
          >
            Custom
          </Button>
        </div>
        
        {showCustomExpiry && (
          <div>
            <Input
              type="datetime-local"
              value={customExpiry}
              onChange={(e) => {
                setCustomExpiry(e.target.value)
                setFormData({ ...formData, expiresAt: e.target.value })
              }}
              className="mt-2"
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="quota">Usage Quota (Leave empty for unlimited)</Label>
        <Input
          id="quota"
          type="number"
          value={formData.quota}
          onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
          placeholder="e.g. 1000"
          min="1"
          className="mt-1.5"
        />
      </div>

      {!initialData && (
        <div>
          <Label htmlFor="quantity">Number of Tokens to Create</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            min="1"
            max="10"
            className="mt-1.5"
          />
        </div>
      )}

      <div>
        <Label htmlFor="ip-whitelist">IP Whitelist (One per line)</Label>
        <textarea
          id="ip-whitelist"
          value={formData.ipWhitelist}
          onChange={(e) => setFormData({ ...formData, ipWhitelist: e.target.value })}
          placeholder="e.g.&#10;192.168.1.1&#10;10.0.0.1"
          className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!formData.name.trim() || (!!formData.quantity && (parseInt(formData.quantity) < 1 || parseInt(formData.quantity) > 10))}
        >
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </div>
  )
}
