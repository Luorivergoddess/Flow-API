"use client"

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const MOCK_COST_DATA = [
  { time: '00:00', cost: 0.12, requests: 15 },
  { time: '01:00', cost: 0.08, requests: 10 },
  { time: '02:00', cost: 0.04, requests: 5 },
  { time: '03:00', cost: 0.02, requests: 3 },
  { time: '04:00', cost: 0.01, requests: 2 },
  { time: '05:00', cost: 0.03, requests: 4 },
  { time: '06:00', cost: 0.15, requests: 18 },
  { time: '07:00', cost: 0.25, requests: 25 },
  { time: '08:00', cost: 0.35, requests: 32 },
  { time: '09:00', cost: 0.42, requests: 38 },
  { time: '10:00', cost: 0.38, requests: 35 },
  { time: '11:00', cost: 0.45, requests: 40 }
]

interface StatCardProps {
  title: string
  value: string
  description?: string
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
        {description && (
          <p className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        )}
      </div>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [timeGranularity, setTimeGranularity] = useState('hour')
  
  return (
    <div className="space-y-6">
      {/* Time Range Selection */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Start Time</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input type="datetime-local" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>End Time</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input type="datetime-local" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Time Granularity</Label>
            <RadioGroup
              defaultValue="hour"
              value={timeGranularity}
              onValueChange={setTimeGranularity}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hour" id="hour" />
                <Label htmlFor="hour">Hour</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="day" id="day" />
                <Label htmlFor="day">Day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="month" id="month" />
                <Label htmlFor="month">Month</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Current Balance" value="$0.00" />
        <StatCard title="Historical Cost" value="$2.93" />
        <StatCard title="Request Count" value="147" />
        <StatCard title="Statistics Amount" value="$0.00" />
        <StatCard title="Total Tokens" value="0" />
        <StatCard title="Total Count" value="0" />
        <StatCard title="Average RPM" value="0.000" />
        <StatCard title="Average TPM" value="NaN" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Cost Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MOCK_COST_DATA}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cost" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Request Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_COST_DATA}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
