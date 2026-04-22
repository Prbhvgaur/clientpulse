import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@clientpulse/ui";

export default function BillingSettingsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10 lg:px-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Upgrade, view plan limits, or open the Stripe portal.</CardDescription>
            </div>
            <Badge className="bg-teal-100 text-teal-700">Pro</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>Current plan: Pro at $12/month.</p>
          <p>Features unlocked: unlimited projects, unlimited clients, custom domain support.</p>
        </CardContent>
      </Card>
    </main>
  );
}
