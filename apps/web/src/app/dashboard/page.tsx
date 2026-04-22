import Link from "next/link";

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@clientpulse/ui";

import { demoProjects } from "@/lib/demo-store";
import { projectStatusMeta } from "@/lib/utils";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-10">
      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Active projects", "02"],
          ["Clients", "01"],
          ["Page views", "30"],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-4xl font-semibold text-slate-950">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Project momentum</CardTitle>
            <CardDescription>A quick view of every active project and where it stands.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoProjects.map((project) => {
              const status = projectStatusMeta(project.status);
              return (
                <Link className="block rounded-3xl border border-slate-200 p-5 transition hover:border-slate-900" href={`/dashboard/projects/${project.id}`} key={project.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{project.name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                    </div>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                  <div className="mt-4">
                    <Progress value={project.status === "IN_REVIEW" ? 90 : 64} />
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What to do next</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
            <p>Publish your first branded page and send the link to your client.</p>
            <p>Connect GitHub to auto-import commits and merged PR activity.</p>
            <p>Upgrade to Pro when you need unlimited projects or a custom domain.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
