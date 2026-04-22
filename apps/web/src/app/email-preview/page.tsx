import { render } from "@react-email/render";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { MagicLinkEmail, MilestoneCompletedEmail, PaymentFailedEmail, ProjectSharedEmail, TeamInviteEmail, WelcomeEmail } from "@/lib/email-templates";

export default async function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const previews = [
    ["Magic link", await render(MagicLinkEmail({ loginUrl: "https://clientpulse.app/login" }))],
    ["Welcome", await render(WelcomeEmail({ dashboardUrl: "https://clientpulse.app/onboarding" }))],
    ["Project shared", await render(ProjectSharedEmail({ projectName: "ClientPulse Launch", shareUrl: "https://clientpulse.app/p/demo/project" }))],
    ["Milestones", await render(MilestoneCompletedEmail({ projectName: "ClientPulse Launch", summary: "Three milestones were completed this week.", shareUrl: "https://clientpulse.app/p/demo/project" }))],
    ["Payment failed", await render(PaymentFailedEmail({ billingUrl: "https://clientpulse.app/dashboard/settings/billing" }))],
    ["Invite", await render(TeamInviteEmail({ inviteUrl: "https://clientpulse.app/invite/demo", orgName: "Northstar Studio", inviterName: "Alex Mason" }))],
  ] as const;

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      {previews.map(([title, markup]) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Rendered HTML preview for development.</CardDescription>
          </CardHeader>
          <CardContent>
            <iframe className="h-[420px] w-full rounded-2xl border border-slate-200 bg-white" srcDoc={markup} title={title} />
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
