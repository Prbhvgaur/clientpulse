import { notFound } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@clientpulse/ui";

import { demoClients, demoProjects } from "@/lib/demo-store";

export default async function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = demoClients.find((item) => item.id === id);
  if (!client) {
    notFound();
  }

  const projects = demoProjects.filter((item) => item.clientId === client.id);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10 lg:px-10">
      <Card>
        <CardHeader>
          <CardTitle>{client.name}</CardTitle>
          <CardDescription>{client.company}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>{client.email}</p>
          <p>Projects: {projects.length}</p>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
