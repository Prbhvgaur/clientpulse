import Link from "next/link";

import { Button, Card, CardContent, Input } from "@/components/ui";

import { demoProjects } from "@/lib/demo-store";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-slate-950">Projects</h1>
          <p className="mt-2 text-slate-600">Search, filter, and jump into project editing.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>New project</Button>
        </Link>
      </div>
      <Card>
        <CardContent className="p-6">
          <Input placeholder="Search projects or clients..." />
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        {demoProjects.map((project) => (
          <Card key={project.id}>
            <CardContent className="space-y-4 p-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">{project.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
              </div>
              <Link className="font-semibold text-slate-950" href={`/dashboard/projects/${project.id}`}>
                Open project editor
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
