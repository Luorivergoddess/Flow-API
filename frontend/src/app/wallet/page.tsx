"use client"

import { useState } from 'react'
import { BarChart3, CreditCard, DollarSign, History } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

interface Transaction {
  id: string
  type: 'charge' | 'consume'
  amount: number
  timestamp: Date
  description: string
  status: 'completed' | 'pending' | 'failed'
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'charge',
    amount: 100,
    timestamp: new Date('2024-04-05T10:30:00'),
    description: 'Manual top-up',
    status: 'completed'
  },
  {
    id: '2',
    type: 'consume',
    amount: 15.5,
    timestamp: new Date('2024-04-05T09:20:00'),
    description: 'API usage - Chat completions',
    status: 'completed'
  },
  {
    id: '3',
    type: 'charge',
    amount: 50,
    timestamp: new Date('2024-04-04T15:45:00'),
    description: 'Auto top-up',
    status: 'completed'
  }
]

export default function WalletPage() {
  const [balance] = useState(134.50)
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [chargeAmount, setChargeAmount] = useState('')

  const handleCharge = () => {
    // TODO: Implement actual charging logic
    console.log('Charging:', chargeAmount)
  }

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <DollarSign className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Current Balance</p>
              <h3 className="text-2xl font-bold">${balance.toFixed(2)}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <BarChart3 className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">This Month Usage</p>
              <h3 className="text-2xl font-bold">$45.50</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <History className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Last Top-up</p>
              <h3 className="text-2xl font-bold">$100.00</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Top-up Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Top Up Balance</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-grow max-w-xs space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                id="amount"
                type="number"
                min="10"
                step="10"
                placeholder="100"
                className="pl-9"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleCharge} disabled={!chargeAmount || parseFloat(chargeAmount) < 10}>
            <CreditCard className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </Card>

      {/* Transaction History */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.timestamp.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className={
                    transaction.type === 'charge' 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }>
                    {transaction.type === 'charge' ? 'Top-up' : 'Usage'}
                  </span>
                </TableCell>
                <TableCell>
                  {transaction.description}
                </TableCell>
                <TableCell className={
                  transaction.type === 'charge'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }>
                  {transaction.type === 'charge' ? '+' : '-'}
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
