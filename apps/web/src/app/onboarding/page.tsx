import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@clientpulse/ui";

export const metadata = {
  title: "Onboarding",
};

const steps = [
  "What's your name and what do you do?",
  "Name your workspace",
  "Make it yours",
  "Add your first client",
  "Create your first project",
];

export default function OnboardingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.22em] text-teal-700">Onboarding</p>
        <h1 className="text-4xl font-semibold text-slate-950">Set up your workspace in five gentle steps.</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <Card>
          <CardContent className="space-y-4 p-6">
            {steps.map((step, index) => (
              <div className="flex items-start gap-3" key={step}>
                <div className={`mt-0.5 flex size-8 items-center justify-center rounded-full ${index === 0 ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {index + 1}
                </div>
                <p className={index === 0 ? "font-semibold text-slate-950" : "text-slate-500"}>{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Step 1 of 5</CardTitle>
            <CardDescription>We’ll use this to personalize your workspace and emails.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input placeholder="Your name" />
            <Input placeholder="Freelancer / Agency / Consultant" />
            <Input placeholder="Workspace name" />
            <Input placeholder="northstar-studio" />
            <div className="flex gap-3">
              <Button>Save and continue</Button>
              <Button variant="outline">Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
