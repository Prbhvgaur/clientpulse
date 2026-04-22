import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/components/ui";

export default function NewClientPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
      <Card>
        <CardHeader>
          <CardTitle>Add client</CardTitle>
          <CardDescription>Create a client profile before sharing the first status page.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Input placeholder="Company" />
          <Button>Create client</Button>
        </CardContent>
      </Card>
    </main>
  );
}
