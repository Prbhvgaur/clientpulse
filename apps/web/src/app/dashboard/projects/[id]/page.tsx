import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@clientpulse/ui";

import { getProjectBundleById } from "@/lib/repository";
import { formatDate, milestoneStatusMeta, projectStatusMeta } from "@/lib/utils";

export default async function ProjectEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bundle = await getProjectBundleById("northstar-studio", id);

  if (!bundle) {
    notFound();
  }

  const status = projectStatusMeta(bundle.project.status);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-teal-700">Project editor</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">{bundle.project.name}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{bundle.project.description}</p>
        </div>
        <Badge className={status.className}>{status.label}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Visibility, schedule, share link, and client pairing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
            <p>Client: {bundle.client?.name ?? "Not assigned"}</p>
            <p>Schedule: {formatDate(bundle.project.startDate)} to {formatDate(bundle.project.dueDate)}</p>
            <p>Visibility: {bundle.project.visibility}</p>
            <Link className="font-semibold text-slate-950" href={`/p/${bundle.organization.slug}/${bundle.project.slug}`}>
              Open public page
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Quick summary of audience attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Total views: {bundle.analytics.totalViews}</p>
            <p>Unique visitors estimate: {bundle.analytics.uniqueVisitors}</p>
            <p>Top country: {bundle.analytics.topCountries[0]?.country ?? "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Drag-and-drop ready milestone sequence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bundle.milestones.map((milestone) => {
              const meta = milestoneStatusMeta(milestone.status);
              return (
                <div className="rounded-3xl border border-slate-200 p-4" key={milestone.id}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-950">{milestone.title}</h3>
                      <p className="text-sm text-slate-600">{milestone.description}</p>
                    </div>
                    <Badge className={meta.className}>{meta.label}</Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect your tooling and keep the feed in sync.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            {bundle.integrations.map((integration) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={integration.id}>
                <p className="font-semibold text-slate-950">{integration.type}</p>
                <p>Status: {integration.isActive ? "Connected" : "Not connected"}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
