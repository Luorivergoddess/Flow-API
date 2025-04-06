"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

interface LogEntry {
  id: string
  timestamp: Date
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  status: number
  duration: number
  ip: string
}

const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date('2024-04-05T10:30:00'),
    endpoint: '/v1/chat/completions',
    method: 'POST',
    status: 200,
    duration: 1200,
    ip: '192.168.1.1'
  },
  {
    id: '2',
    timestamp: new Date('2024-04-05T10:29:00'),
    endpoint: '/v1/models',
    method: 'GET',
    status: 200,
    duration: 150,
    ip: '192.168.1.1'
  },
  {
    id: '3',
    timestamp: new Date('2024-04-05T10:28:00'),
    endpoint: '/v1/chat/completions',
    method: 'POST',
    status: 429,
    duration: 100,
    ip: '192.168.1.2'
  }
]

export default function LogPage() {
  const [logs] = useState<LogEntry[]>(MOCK_LOGS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'error'>('all')

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.endpoint.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search)
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'success' && log.status < 400) ||
      (statusFilter === 'error' && log.status >= 400)

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: number) => {
    if (status < 300) return 'text-green-600 dark:text-green-400'
    if (status < 400) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-blue-600 dark:text-blue-400'
      case 'POST': return 'text-green-600 dark:text-green-400'
      case 'PUT': return 'text-yellow-600 dark:text-yellow-400'
      case 'DELETE': return 'text-red-600 dark:text-red-400'
      default: return ''
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex gap-4 items-center">
          <div className="flex-grow flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search logs..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'success' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('success')}
            >
              Success
            </Button>
            <Button
              variant={statusFilter === 'error' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('error')}
            >
              Error
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell>
                  {log.timestamp.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className={getMethodColor(log.method)}>
                    {log.method}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {log.endpoint}
                </TableCell>
                <TableCell>
                  <span className={getStatusColor(log.status)}>
                    {log.status}
                  </span>
                </TableCell>
                <TableCell>
                  {log.duration}ms
                </TableCell>
                <TableCell className="font-mono">
                  {log.ip}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
