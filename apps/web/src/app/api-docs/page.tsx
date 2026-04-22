import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const routes = [
  "GET /api/organizations",
  "POST /api/organizations",
  "GET /api/organizations/[slug]/projects",
  "POST /api/organizations/[slug]/projects/[id]/updates",
  "GET /api/public/[orgSlug]/[projectSlug]",
  "POST /api/billing/checkout",
  "POST /api/webhooks/stripe",
];

export default function ApiDocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
      <Card>
        <CardHeader>
          <CardTitle>API reference</CardTitle>
          <CardDescription>The ClientPulse app uses typed route handlers that validate every payload.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {routes.map((route) => (
            <div className="rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-700" key={route}>
              {route}
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
