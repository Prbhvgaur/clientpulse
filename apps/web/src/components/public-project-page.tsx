import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Circle,
  Clock3,
  GitBranch,
  LoaderCircle,
  Radio,
} from "lucide-react";

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@/components/ui";

import type { AppMilestone, AppProjectUpdate, ProjectBundle } from "@/lib/types";
import { cn, formatDate, formatRelative, milestoneStatusMeta, percentElapsed, projectStatusMeta } from "@/lib/utils";

function milestoneIcon(status: AppMilestone["status"]) {
  switch (status) {
    case "PENDING":
      return <Circle className="size-5 text-slate-400" />;
    case "IN_PROGRESS":
      return <LoaderCircle className="size-5 animate-spin text-sky-500" />;
    case "COMPLETED":
      return <CheckCircle2 className="size-5 text-emerald-500" />;
    case "BLOCKED":
      return <AlertTriangle className="size-5 text-rose-500" />;
  }
}

function updateIcon(type: AppProjectUpdate["type"]) {
  switch (type) {
    case "GITHUB_COMMIT":
    case "GITHUB_PR_MERGED":
      return <GitBranch className="size-4 text-slate-600" />;
    case "MILESTONE_COMPLETED":
      return <CheckCircle2 className="size-4 text-emerald-500" />;
    case "STATUS_CHANGED":
      return <Radio className="size-4 text-amber-500" />;
    default:
      return <Clock3 className="size-4 text-slate-500" />;
  }
}

export function PublicProjectPage({ bundle }: { bundle: ProjectBundle }) {
  const completedMilestones = bundle.milestones.filter((item) => item.status === "COMPLETED").length;
  const statusMeta = projectStatusMeta(bundle.project.status);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#ecfeff_100%)] text-slate-950">
      <header
        className="border-b border-white/20"
        style={{
          background: `linear-gradient(135deg, ${bundle.organization.brandColor}, #0f172a)`,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 text-white lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-white/15">
              {bundle.organization.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={bundle.organization.name} className="size-10 rounded-xl object-cover" src={bundle.organization.logoUrl} />
              ) : (
                <span className="text-sm font-bold">{bundle.organization.name.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">{bundle.organization.name}</p>
              <p className="text-sm text-white/70">{bundle.organization.customDomain ?? `clientpulse.app/p/${bundle.organization.slug}`}</p>
            </div>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium hover:bg-white/18" href="/">
            Powered by ClientPulse
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:px-10">
        <section className="space-y-8">
          <Card className="overflow-hidden border-white/70 bg-white/85 backdrop-blur">
            <CardContent className="space-y-8 p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="space-y-4">
                  <Badge className="bg-slate-900 text-white">Live project status</Badge>
                  <div>
                    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 lg:text-5xl">{bundle.project.name}</h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{bundle.project.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span>{bundle.client ? `${bundle.client.name}${bundle.client.company ? ` · ${bundle.client.company}` : ""}` : "Internal project"}</span>
                    <span className="text-slate-300">•</span>
                    <span>Updated {formatRelative(bundle.project.updatedAt)}</span>
                  </div>
                </div>
                <Badge className={cn("text-sm normal-case tracking-normal", statusMeta.className)}>{statusMeta.label}</Badge>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3 rounded-3xl bg-slate-950 p-6 text-white">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <CalendarClock className="size-4" />
                    <span>
                      {formatDate(bundle.project.startDate)} to {formatDate(bundle.project.dueDate)}
                    </span>
                  </div>
                  <Progress className="bg-white/10 [&>div]:bg-white" value={percentElapsed(bundle.project.startDate, bundle.project.dueDate)} />
                  <p className="text-sm text-white/80">Schedule progress based on elapsed days across the active delivery window.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-slate-100 p-5">
                    <p className="text-sm text-slate-500">Milestones</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950">
                      {completedMilestones}/{bundle.milestones.length}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-5">
                    <p className="text-sm text-slate-500">Total views</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950">{bundle.analytics.totalViews}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/88 backdrop-blur">
            <CardHeader>
              <CardTitle>Milestone tracker</CardTitle>
              <CardDescription>
                {completedMilestones} of {bundle.milestones.length} milestones complete
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Progress value={(completedMilestones / Math.max(1, bundle.milestones.length)) * 100} />
              <div className="space-y-6">
                {bundle.milestones.map((milestone, index) => {
                  const meta = milestoneStatusMeta(milestone.status);
                  return (
                    <div className="grid grid-cols-[auto_1fr] gap-4" key={milestone.id}>
                      <div className="relative flex w-10 justify-center">
                        <div className="mt-1 flex size-8 items-center justify-center rounded-full bg-white shadow-sm">{milestoneIcon(milestone.status)}</div>
                        {index < bundle.milestones.length - 1 ? <div className="absolute top-9 h-[calc(100%+1rem)] w-px bg-slate-200" /> : null}
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-950">{milestone.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{milestone.description}</p>
                          </div>
                          <Badge className={cn("normal-case tracking-normal", meta.className)}>{meta.label}</Badge>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                          <span>Due {formatDate(milestone.dueDate)}</span>
                          {milestone.completedAt ? <span>Completed {formatDate(milestone.completedAt)}</span> : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="border-white/70 bg-white/88 backdrop-blur">
            <CardHeader>
              <CardTitle>Activity feed</CardTitle>
              <CardDescription>Recent updates pulled from manual posts and integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {bundle.updates.slice(0, 10).map((update) => (
                <div className="flex gap-4" key={update.id}>
                  <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100">{updateIcon(update.type)}</div>
                  <div className="space-y-2">
                    <p className="text-sm leading-6 text-slate-700">{update.content}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                      <span>{update.authorName ?? "ClientPulse"}</span>
                      <span>•</span>
                      <span>{formatRelative(update.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/88 backdrop-blur">
            <CardHeader>
              <CardTitle>Need a deeper view?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
              <p>This page is branded for your client and updates automatically as milestones move forward.</p>
              <p>{bundle.organization.footerMessage ?? "Questions? Reach out and we’ll get back quickly."}</p>
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950" href={`mailto:${bundle.organization.supportEmail ?? "hello@clientpulse.app"}`}>
                Email support
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
