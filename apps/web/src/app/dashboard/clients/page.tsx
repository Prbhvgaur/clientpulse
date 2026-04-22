import Link from "next/link";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@clientpulse/ui";

import { demoClients } from "@/lib/demo-store";

export default function ClientsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10 lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-slate-950">Clients</h1>
          <p className="mt-2 text-slate-600">A lightweight CRM view for the people receiving your status pages.</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button>Add client</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {demoClients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <CardTitle>{client.name}</CardTitle>
              <CardDescription>{client.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{client.email}</p>
              <Link className="mt-4 inline-flex font-semibold text-slate-950" href={`/dashboard/clients/${client.id}`}>
                Open client profile
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
