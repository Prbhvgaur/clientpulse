import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@clientpulse/ui";

import { demoOrganizations } from "@/lib/demo-store";

export default function SettingsPage() {
  const org = demoOrganizations[0]!;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10 lg:px-10">
      <Card>
        <CardHeader>
          <CardTitle>Organization settings</CardTitle>
          <CardDescription>Branding, domain, billing, and team preferences live here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>Name: {org.name}</p>
          <p>Brand color: {org.brandColor}</p>
          <p>Custom domain: {org.customDomain}</p>
          <p>Plan: {org.planId}</p>
        </CardContent>
      </Card>
    </main>
  );
}
