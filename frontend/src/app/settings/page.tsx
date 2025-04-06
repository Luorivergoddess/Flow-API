"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock user role, should be fetched from auth state in real app
const userRole = 'admin' // or 'user'

export default function SettingsPage() {
  const [theme, setTheme] = useState('system')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true
  })

  // User settings view
  const UserSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Profile</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" />
          </div>
          <Button>Change Password</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, email: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, push: checked }))
              }
            />
          </div>
        </div>
      </Card>
    </div>
  )

  // Admin settings view
  const AdminSettings = () => (
    <div className="space-y-6">
      <UserSettings />

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">API Keys</h3>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Production Key</TableCell>
                <TableCell>2024-04-05</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">Revoke</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button>Generate New API Key</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Billing Management</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Current Plan</h4>
              <p className="text-sm text-zinc-500">Professional</p>
            </div>
            <Button>Change Plan</Button>
          </div>
          <div>
            <h4 className="font-medium mb-2">Billing History</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-04-01</TableCell>
                  <TableCell>$99.00</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Download</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-url">API Base URL</Label>
            <Input id="api-url" placeholder="https://api.example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-requests">Max Requests per Minute</Label>
            <Input id="max-requests" type="number" placeholder="1000" />
          </div>
          <Button>Save Configuration</Button>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      {userRole === 'admin' ? <AdminSettings /> : <UserSettings />}
    </div>
  )
}
