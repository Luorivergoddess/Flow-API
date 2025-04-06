import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Import Card component

// Mock data for API services
const services = [
  { id: "svc_1", name: "OpenAI GPT-4", type: "LLM", status: "Active", calls: 1502 },
  { id: "svc_2", name: "Stripe Payments", type: "Payment", status: "Active", calls: 876 },
  { id: "svc_3", name: "Twilio SMS", type: "Messaging", status: "Inactive", calls: 34 },
  { id: "svc_4", name: "Google Maps Geocoding", type: "Mapping", status: "Active", calls: 5210 },
  { id: "svc_5", name: "SendGrid Email", type: "Email", status: "Active", calls: 1298 },
];

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">API Services</h1>
        <Button>Add New Service</Button>
      </div>
      {/* Card with consistent padding */}
      <Card className="p-6">
        <Table>
          <TableCaption>A list of your configured API services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Calls (Last 30d)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.type}</TableCell>
                <TableCell>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     service.status === 'Active'
                       ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                       : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                   }`}>
                     {service.status}
                   </span>
                </TableCell>
                <TableCell>{service.calls.toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
