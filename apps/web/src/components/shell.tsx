import Link from "next/link";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";

import { Badge, Button } from "@/components/ui";

export function MarketingNav() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <Link className="flex items-center gap-3 text-slate-950" href="/">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-teal-700 text-sm font-bold text-white">CP</div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">ClientPulse</p>
          <p className="text-xs text-slate-500">Status pages clients actually use</p>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Badge className="hidden bg-white/80 text-slate-700 md:inline-flex">Production-ready starter</Badge>
        <Link href="/login">
          <Button className="gap-2" variant="default">
            Start for free
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}

export function DashboardNav() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link className="flex items-center gap-3 text-slate-950" href="/dashboard">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">CP</div>
          <div>
            <p className="text-sm font-semibold">Northstar Studio</p>
            <p className="text-xs text-slate-500">Workspace control room</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/dashboard/projects">Projects</Link>
          <Link href="/dashboard/clients">Clients</Link>
          <Link href="/dashboard/settings">Settings</Link>
          <Link href="/api-docs">API</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/p/northstar-studio/clientpulse-launch">
            <Button className="gap-2" variant="outline">
              <Sparkles className="size-4" />
              Preview public page
            </Button>
          </Link>
          <Link href="/dashboard/projects/project-launch">
            <Button className="gap-2">
              <LayoutDashboard className="size-4" />
              Open editor
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
