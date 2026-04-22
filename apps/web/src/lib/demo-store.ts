import type {
  AppClient,
  AppIntegration,
  AppMilestone,
  AppMembership,
  AppOrganization,
  AppPageView,
  AppProject,
  AppProjectUpdate,
  AppUser,
  ProjectBundle,
} from "./types";

const now = new Date();

export const demoUser: AppUser = {
  id: "demo-user",
  name: "Alex Mason",
  email: "demo@clientpulse.app",
  image: "https://dummyimage.com/96x96/0f766e/ffffff.png&text=AM",
};

export const demoOrganizations: AppOrganization[] = [
  {
    id: "org-northstar",
    name: "Northstar Studio",
    slug: "northstar-studio",
    logoUrl: "https://dummyimage.com/96x96/0f766e/ffffff.png&text=NS",
    brandColor: "#0f766e",
    planId: "pro",
    ownerId: demoUser.id,
    customDomain: "status.northstarstudio.co",
    supportEmail: "hello@northstar.studio",
    footerMessage: "Questions? Email hello@northstar.studio",
  },
];

export const demoMemberships: AppMembership[] = [
  { id: "member-1", organizationId: "org-northstar", userId: demoUser.id, role: "OWNER" },
];

export const demoClients: AppClient[] = [
  {
    id: "client-lumen",
    organizationId: "org-northstar",
    name: "Sophie Carter",
    email: "sophie@lumenlabs.co",
    company: "Lumen Labs",
    avatarUrl: "https://dummyimage.com/96x96/f59e0b/ffffff.png&text=LL",
    createdAt: new Date("2026-04-01T09:00:00.000Z").toISOString(),
  },
];

export const demoProjects: AppProject[] = [
  {
    id: "project-launch",
    organizationId: "org-northstar",
    clientId: "client-lumen",
    name: "ClientPulse Launch",
    slug: "clientpulse-launch",
    description: "A polished, branded client progress portal that replaces update emails with a living status page.",
    status: "IN_PROGRESS",
    visibility: "PUBLIC",
    accessToken: "demo-access-token",
    startDate: new Date("2026-04-01T00:00:00.000Z").toISOString(),
    dueDate: new Date("2026-05-10T00:00:00.000Z").toISOString(),
    createdAt: new Date("2026-04-01T00:00:00.000Z").toISOString(),
    updatedAt: now.toISOString(),
  },
  {
    id: "project-portal",
    organizationId: "org-northstar",
    clientId: "client-lumen",
    name: "Analytics Portal Refresh",
    slug: "analytics-portal-refresh",
    description: "Design system cleanup, mobile QA, and dashboard performance optimization.",
    status: "IN_REVIEW",
    visibility: "LINK_ONLY",
    accessToken: "private-portal-token",
    startDate: new Date("2026-03-15T00:00:00.000Z").toISOString(),
    dueDate: new Date("2026-04-30T00:00:00.000Z").toISOString(),
    createdAt: new Date("2026-03-12T00:00:00.000Z").toISOString(),
    updatedAt: now.toISOString(),
  },
];

export const demoMilestones: AppMilestone[] = [
  {
    id: "milestone-1",
    projectId: "project-launch",
    title: "Discovery workshop",
    description: "Stakeholder interviews, scope alignment, and roadmap review.",
    status: "COMPLETED",
    dueDate: new Date("2026-04-05T00:00:00.000Z").toISOString(),
    completedAt: new Date("2026-04-05T16:00:00.000Z").toISOString(),
    order: 0,
  },
  {
    id: "milestone-2",
    projectId: "project-launch",
    title: "Design system",
    description: "Typography, color system, and reusable page patterns.",
    status: "COMPLETED",
    dueDate: new Date("2026-04-12T00:00:00.000Z").toISOString(),
    completedAt: new Date("2026-04-11T17:00:00.000Z").toISOString(),
    order: 1,
  },
  {
    id: "milestone-3",
    projectId: "project-launch",
    title: "Core dashboard",
    description: "Project editor, client list, and milestone management.",
    status: "IN_PROGRESS",
    dueDate: new Date("2026-04-22T00:00:00.000Z").toISOString(),
    order: 2,
  },
  {
    id: "milestone-4",
    projectId: "project-launch",
    title: "Public status page",
    description: "Polished timeline, activity feed, and branded presentation.",
    status: "PENDING",
    dueDate: new Date("2026-04-28T00:00:00.000Z").toISOString(),
    order: 3,
  },
  {
    id: "milestone-5",
    projectId: "project-launch",
    title: "Launch and QA",
    description: "Accessibility checks, analytics, and deploy handoff.",
    status: "PENDING",
    dueDate: new Date("2026-05-06T00:00:00.000Z").toISOString(),
    order: 4,
  },
];

export const demoUpdates: AppProjectUpdate[] = [
  {
    id: "update-1",
    projectId: "project-launch",
    content: "Kickoff complete and roadmap approved.",
    type: "MANUAL",
    authorName: "Alex Mason",
    createdAt: new Date("2026-04-02T12:00:00.000Z").toISOString(),
  },
  {
    id: "update-2",
    projectId: "project-launch",
    content: "Merged the dashboard foundation and API scaffolding.",
    type: "GITHUB_PR_MERGED",
    authorName: "GitHub Sync",
    createdAt: new Date("2026-04-10T12:00:00.000Z").toISOString(),
  },
  {
    id: "update-3",
    projectId: "project-launch",
    content: "The design system milestone is complete and approved by the client.",
    type: "MILESTONE_COMPLETED",
    authorName: "Alex Mason",
    createdAt: new Date("2026-04-12T17:00:00.000Z").toISOString(),
  },
  {
    id: "update-4",
    projectId: "project-launch",
    content: "Imported recent GitHub commits to keep the public feed fresh.",
    type: "GITHUB_COMMIT",
    authorName: "GitHub Sync",
    createdAt: new Date("2026-04-18T10:00:00.000Z").toISOString(),
  },
];

export const demoIntegrations: AppIntegration[] = [
  {
    id: "integration-github",
    projectId: "project-launch",
    type: "GITHUB",
    isActive: true,
    config: { repository: "northstar-studio/clientpulse" },
    lastSyncAt: now.toISOString(),
  },
  {
    id: "integration-linear",
    projectId: "project-launch",
    type: "LINEAR",
    isActive: false,
    config: {},
  },
];

export const demoPageViews: AppPageView[] = Array.from({ length: 30 }, (_, index) => ({
  id: `view-${index}`,
  projectId: "project-launch",
  country: index % 3 === 0 ? "US" : index % 3 === 1 ? "GB" : "IN",
  viewedAt: new Date(now.getTime() - index * 1000 * 60 * 60 * 12).toISOString(),
}));

export function getDemoProjectBundle(orgSlug: string, projectSlug: string): ProjectBundle | null {
  const organization = demoOrganizations.find((item) => item.slug === orgSlug);
  const project = demoProjects.find((item) => item.slug === projectSlug && item.organizationId === organization?.id);

  if (!organization || !project) {
    return null;
  }

  const client = demoClients.find((item) => item.id === project.clientId);
  const milestones = [...demoMilestones].filter((item) => item.projectId === project.id).sort((a, b) => a.order - b.order);
  const updates = [...demoUpdates]
    .filter((item) => item.projectId === project.id)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const integrations = demoIntegrations.filter((item) => item.projectId === project.id);
  const views = demoPageViews.filter((item) => item.projectId === project.id);

  return {
    organization,
    client,
    project,
    milestones,
    updates,
    integrations,
    analytics: {
      totalViews: views.length,
      uniqueVisitors: Math.max(1, Math.floor(views.length * 0.72)),
      topCountries: [
        { country: "United States", views: 12 },
        { country: "United Kingdom", views: 10 },
        { country: "India", views: 8 },
      ],
      dailyViews: Array.from({ length: 14 }, (_, index) => ({
        date: new Date(now.getTime() - (13 - index) * 1000 * 60 * 60 * 24).toISOString(),
        views: Math.max(2, 6 + Math.round(Math.sin(index) * 4)),
      })),
    },
  };
}
