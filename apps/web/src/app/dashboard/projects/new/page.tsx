import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@clientpulse/ui";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a new project</CardTitle>
          <CardDescription>Start with the basics, then refine milestones and updates inside the editor.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input placeholder="Project name" />
          <Input placeholder="project-slug" />
          <Input placeholder="Client ID" />
          <Input placeholder="Due date ISO string" />
          <Button>Create project</Button>
        </CardContent>
      </Card>
    </main>
  );
}
