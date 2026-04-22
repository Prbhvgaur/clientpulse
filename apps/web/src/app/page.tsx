import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, Layers3, MessageSquareText } from "lucide-react";

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@clientpulse/ui";

import { MarketingNav } from "@/components/shell";

const pricing = [
  {
    name: "Free",
    price: "$0",
    description: "For freelancers trying ClientPulse on one project.",
    features: ["1 project", "1 client", "Public status page"],
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "Unlimited projects with brand control and custom domains.",
    features: ["Unlimited projects", "Unlimited clients", "Custom domain", "Priority templates"],
    highlight: true,
  },
  {
    name: "Agency",
    price: "$39/mo",
    description: "Team workflows, white-label delivery, and support.",
    features: ["Unlimited everything", "Team members", "Priority support", "Advanced analytics"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.18),_transparent_28%),linear-gradient(180deg,_#eff6ff_0%,_#f8fafc_46%,_#ffffff_100%)]">
      <MarketingNav />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-10 lg:pt-20">
        <div className="space-y-8">
          <Badge className="bg-white/85 text-slate-700 shadow-sm">Trusted update pages for client work</Badge>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 lg:text-7xl">
              Stop answering &quot;any updates?&quot; and give clients a page they&apos;ll actually check.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              ClientPulse turns project progress into a branded, real-time status hub with milestones, activity, analytics, and white-label polish.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <Button className="gap-2" size="lg">
                Start for free
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/p/northstar-studio/clientpulse-launch">
              <Button size="lg" variant="secondary">
                See a live example
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>Join 500+ freelancers & agencies</span>
            <span>•</span>
            <span>Launch in minutes</span>
            <span>•</span>
            <span>Beautiful on desktop and mobile</span>
          </div>
        </div>

        <div className="grid-surface rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_40px_120px_-48px_rgba(15,23,42,0.55)] backdrop-blur">
          <div className="rounded-[1.6rem] border border-slate-200 bg-slate-950 p-4 text-white">
            <div className="mb-4 flex gap-2">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-4 rounded-[1.2rem] bg-white p-5 text-slate-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-teal-700">Northstar Studio</p>
                  <h2 className="mt-2 text-2xl font-semibold">ClientPulse Launch</h2>
                </div>
                <Badge className="bg-sky-100 text-sky-700">In Progress</Badge>
              </div>
              <div className="rounded-3xl bg-slate-950 p-4 text-white">
                <p className="text-sm text-white/70">Schedule progress</p>
                <div className="mt-4 h-3 rounded-full bg-white/10">
                  <div className="h-3 w-2/3 rounded-full bg-white" />
                </div>
              </div>
              <div className="space-y-3">
                {["Discovery complete", "Design approved", "Dashboard in progress"].map((item) => (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3" key={item}>
                    <CheckCircle2 className="size-5 text-emerald-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3 lg:px-10">
        {[
          ["Client emails", "Stop writing the same status summary in every thread."],
          ["WhatsApp chaos", "Bring updates, files, and milestones into one branded place."],
          ["Status meetings", "Let the page answer the easy questions before the call starts."],
        ].map(([title, copy]) => (
          <Card className="bg-white/80" key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{copy}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Layers3, title: "Milestone tracker", copy: "Give clients a clear delivery path with due dates and progress." },
            { icon: MessageSquareText, title: "Activity feed", copy: "Combine manual notes with synced commits and merged PRs." },
            { icon: Globe2, title: "White-label branding", copy: "Use your brand color, logo, and custom domain on every page." },
          ].map(({ icon: Icon, title, copy }) => (
            <Card className="border-slate-200 bg-white" key={title}>
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{copy}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Pricing</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-950">Simple plans that grow with your client roster.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <Card className={plan.highlight ? "border-teal-400 shadow-lg shadow-teal-100" : ""} key={plan.name}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.highlight ? <Badge className="bg-teal-100 text-teal-700">Most popular</Badge> : null}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-4xl font-semibold text-slate-950">{plan.price}</p>
                <ul className="space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li className="flex items-start gap-3" key={feature}>
                      <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login">
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                    Choose {plan.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
