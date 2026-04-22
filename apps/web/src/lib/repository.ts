import {
  demoClients,
  demoIntegrations,
  demoMilestones,
  demoOrganizations,
  demoPageViews,
  demoProjects,
  demoUpdates,
  demoUser,
  getDemoProjectBundle,
} from "./demo-store";
import { ApiError } from "./errors";
import { slugify } from "./utils";
import type { AppClient, AppIntegration, AppMilestone, AppOrganization, AppProject } from "./types";

export async function listOrganizations(userId = demoUser.id) {
  return demoOrganizations.filter((org) => org.ownerId === userId);
}

export async function getOrganizationBySlug(slug: string) {
  return demoOrganizations.find((org) => org.slug === slug) ?? null;
}

export async function createOrganization(input: Omit<AppOrganization, "id" | "planId" | "ownerId"> & { ownerId?: string }) {
  const organization: AppOrganization = {
    id: crypto.randomUUID(),
    name: input.name,
    slug: slugify(input.slug || input.name),
    brandColor: input.brandColor,
    logoUrl: input.logoUrl,
    customDomain: input.customDomain,
    planId: "free",
    ownerId: input.ownerId ?? demoUser.id,
    supportEmail: input.supportEmail,
    footerMessage: input.footerMessage,
  };
  demoOrganizations.push(organization);
  return organization;
}

export async function updateOrganization(slug: string, input: Partial<AppOrganization>) {
  const organization = demoOrganizations.find((item) => item.slug === slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  Object.assign(organization, input);
  return organization;
}

export async function listClients(slug: string) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  return demoClients.filter((item) => item.organizationId === organization.id);
}

export async function createClient(slug: string, input: Omit<AppClient, "id" | "organizationId" | "createdAt">) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  const client: AppClient = {
    id: crypto.randomUUID(),
    organizationId: organization.id,
    createdAt: new Date().toISOString(),
    ...input,
  };
  demoClients.push(client);
  return client;
}

export async function updateClient(slug: string, id: string, input: Partial<AppClient>) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  const client = demoClients.find((item) => item.id === id && item.organizationId === organization.id);
  if (!client) {
    throw new ApiError(404, "client_not_found", "Client not found.");
  }
  Object.assign(client, input);
  return client;
}

export async function listProjects(slug: string) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  return demoProjects.filter((item) => item.organizationId === organization.id);
}

export async function createProject(slug: string, input: Omit<AppProject, "id" | "organizationId" | "createdAt" | "updatedAt" | "accessToken">) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  const project: AppProject = {
    id: crypto.randomUUID(),
    organizationId: organization.id,
    accessToken: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...input,
  };
  demoProjects.push(project);
  return project;
}

export async function getProjectBundleById(slug: string, id: string) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    return null;
  }
  const project = demoProjects.find((item) => item.id === id && item.organizationId === organization.id);
  if (!project) {
    return null;
  }
  return getDemoProjectBundle(slug, project.slug);
}

export async function getPublicProjectBundle(orgSlug: string, projectSlug: string, token?: string) {
  const bundle = getDemoProjectBundle(orgSlug, projectSlug);
  if (!bundle) {
    throw new ApiError(404, "project_not_found", "Project not found.");
  }
  if (bundle.project.visibility === "LINK_ONLY" && token !== bundle.project.accessToken) {
    throw new ApiError(403, "access_denied", "Project link token is invalid.");
  }
  return bundle;
}

export async function createProjectUpdate(projectId: string, content: string, authorName?: string) {
  const update = {
    id: crypto.randomUUID(),
    projectId,
    content,
    type: "MANUAL" as const,
    authorName,
    createdAt: new Date().toISOString(),
  };
  demoUpdates.unshift(update);
  return update;
}

export async function recordPageView(projectId: string, country?: string) {
  demoPageViews.push({ id: crypto.randomUUID(), projectId, country, viewedAt: new Date().toISOString() });
  return { ok: true };
}

export async function updateProject(slug: string, id: string, input: Partial<AppProject>) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }
  const project = demoProjects.find((item) => item.id === id && item.organizationId === organization.id);
  if (!project) {
    throw new ApiError(404, "project_not_found", "Project not found.");
  }
  Object.assign(project, input, { updatedAt: new Date().toISOString() });
  return project;
}

export async function createMilestone(projectId: string, input: Omit<AppMilestone, "id" | "projectId" | "order">) {
  const existing = demoMilestones.filter((item) => item.projectId === projectId);
  const milestone: AppMilestone = {
    id: crypto.randomUUID(),
    projectId,
    order: existing.length,
    ...input,
  };
  demoMilestones.push(milestone);
  return milestone;
}

export async function updateMilestone(mid: string, input: Partial<AppMilestone>) {
  const milestone = demoMilestones.find((item) => item.id === mid);
  if (!milestone) {
    throw new ApiError(404, "milestone_not_found", "Milestone not found.");
  }
  Object.assign(milestone, input);
  return milestone;
}

export async function reorderMilestones(projectId: string, milestoneIds: string[]) {
  milestoneIds.forEach((milestoneId, index) => {
    const milestone = demoMilestones.find((item) => item.id === milestoneId && item.projectId === projectId);
    if (milestone) {
      milestone.order = index;
    }
  });
  return demoMilestones.filter((item) => item.projectId === projectId).sort((a, b) => a.order - b.order);
}

export async function deleteById(type: "client" | "project" | "milestone" | "update" | "integration", id: string) {
  const collections = {
    client: demoClients,
    project: demoProjects,
    milestone: demoMilestones,
    update: demoUpdates,
    integration: demoIntegrations,
  };
  const collection = collections[type];
  const index = collection.findIndex((item) => item.id === id);
  if (index >= 0) {
    collection.splice(index, 1);
  }
  return { ok: true };
}

export async function connectIntegration(projectId: string, input: Omit<AppIntegration, "id" | "projectId" | "isActive">) {
  const integration: AppIntegration = {
    id: crypto.randomUUID(),
    projectId,
    isActive: true,
    type: input.type,
    config: input.config,
    lastSyncAt: new Date().toISOString(),
  };
  demoIntegrations.push(integration);
  return integration;
}

export function billingPlans() {
  return [
    { id: "free", name: "Free", priceMonthly: 0, features: ["1 project", "1 client", "Public status page"] },
    { id: "pro", name: "Pro", priceMonthly: 12, features: ["Unlimited projects", "Unlimited clients", "Custom domain"] },
    { id: "agency", name: "Agency", priceMonthly: 39, features: ["Unlimited everything", "Team members", "Priority support"] },
  ];
}
