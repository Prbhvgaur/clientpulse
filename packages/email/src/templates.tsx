import { Button, Link, Text } from "@react-email/components";
import * as React from "react";

import { EmailShell } from "./components/email-shell";

function ActionButton({ href, label, accentColor }: { href: string; label: string; accentColor: string }) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: accentColor,
        borderRadius: "999px",
        color: "#ffffff",
        display: "inline-block",
        fontWeight: 700,
        padding: "14px 20px",
        textDecoration: "none",
      }}
    >
      {label}
    </Button>
  );
}

export function MagicLinkEmail(props: { accentColor?: string; loginUrl: string }) {
  const accentColor = props.accentColor ?? "#0f766e";
  return (
    <EmailShell preview="Click to sign in to ClientPulse" accentColor={accentColor} title="Sign in to ClientPulse">
      <Text style={{ color: "#334155", lineHeight: 1.6 }}>
        Your secure sign-in link is ready. It expires soon, so use it on the device where you requested access.
      </Text>
      <ActionButton accentColor={accentColor} href={props.loginUrl} label="Open ClientPulse" />
    </EmailShell>
  );
}

export function WelcomeEmail(props: { accentColor?: string; dashboardUrl: string }) {
  const accentColor = props.accentColor ?? "#0f766e";
  return (
    <EmailShell preview="Welcome to ClientPulse" accentColor={accentColor} title="Your client update system is ready">
      <Text style={{ color: "#334155", lineHeight: 1.6 }}>
        Start by creating your workspace, adding a client, and publishing your first branded status page.
      </Text>
      <ActionButton accentColor={accentColor} href={props.dashboardUrl} label="Finish onboarding" />
    </EmailShell>
  );
}

export function ProjectSharedEmail(props: { accentColor?: string; projectName: string; message?: string; shareUrl: string }) {
  const accentColor = props.accentColor ?? "#0f766e";
  return (
    <EmailShell preview={`View progress on ${props.projectName}`} accentColor={accentColor} title={`${props.projectName} is live`}>
      <Text style={{ color: "#334155", lineHeight: 1.6 }}>
        A new project status page has been shared with you. Use the link below to view milestones, updates, and progress.
      </Text>
      {props.message ? <Text style={{ color: "#0f172a", fontStyle: "italic" }}>{props.message}</Text> : null}
      <ActionButton accentColor={accentColor} href={props.shareUrl} label="View project page" />
    </EmailShell>
  );
}

export function MilestoneCompletedEmail(props: { accentColor?: string; projectName: string; summary: string; shareUrl: string }) {
  const accentColor = props.accentColor ?? "#0f766e";
  return (
    <EmailShell preview={`Milestone progress on ${props.projectName}`} accentColor={accentColor} title="Milestones completed this week">
      <Text style={{ color: "#334155", lineHeight: 1.6 }}>{props.summary}</Text>
      <ActionButton accentColor={accentColor} href={props.shareUrl} label="Review progress" />
    </EmailShell>
  );
}

export function PaymentFailedEmail(props: { accentColor?: string; billingUrl: string }) {
  const accentColor = props.accentColor ?? "#dc2626";
  return (
    <EmailShell preview="Payment failed for your ClientPulse subscription" accentColor={accentColor} title="Update your billing method">
      <Text style={{ color: "#334155", lineHeight: 1.6 }}>
        We could not process your latest payment. Update your billing details to keep custom domains, unlimited projects, and client access active.
      </Text>
      <ActionButton accentColor={accentColor} href={props.billingUrl} label="Fix billing" />
    </EmailShell>
  );
}

export function TeamInviteEmail(props: { accentColor?: string; inviteUrl: string; orgName: string; inviterName: string }) {
  const accentColor = props.accentColor ?? "#0f766e";
  return (
    <EmailShell preview={`Join ${props.orgName} on ClientPulse`} accentColor={accentColor} title={`You're invited to ${props.orgName}`}>
      <Text style={{ color: "#334155", lineHeight: 1.6 }}>
        {props.inviterName} invited you to collaborate inside ClientPulse. Accept the invite to manage projects, milestones, and client updates together.
      </Text>
      <ActionButton accentColor={accentColor} href={props.inviteUrl} label="Accept invite" />
      <Text style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.6 }}>
        If the button does not work, copy this URL into your browser: <Link href={props.inviteUrl}>{props.inviteUrl}</Link>
      </Text>
    </EmailShell>
  );
}
