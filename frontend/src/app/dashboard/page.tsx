import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming components are in @/components/ui

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total API Calls</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12,345</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Currently connected</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Overall API success</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">99.8%</p>
          </CardContent>
        </Card>
        {/* Add more cards as needed */}
      </div>
      {/* Placeholder for charts or other dashboard elements */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Activity Feed (Placeholder)</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-zinc-500 dark:text-zinc-400">No recent activity.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
