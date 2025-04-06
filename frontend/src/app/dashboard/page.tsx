"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/hooks/use-auth"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Your email: {user.email}
        </p>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Getting Started</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          You can now:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-2 text-zinc-500 dark:text-zinc-400">
          <li>Create API tokens in the Token page</li>
          <li>Check API pricing in the Price page</li>
          <li>Start a conversation in the Chat page</li>
          <li>Monitor your usage in the Log page</li>
          <li>Manage your wallet in the Wallet page</li>
        </ul>
      </Card>
    </div>
  )
}
