import { prisma } from "@clientpulse/db";
import { Prisma } from "@prisma/client";

import { hasDatabaseConfig } from "./env";
import { ApiError } from "./errors";
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
import { slugify } from "./utils";
import type { AppClient, AppIntegration, AppMilestone, AppOrganization, AppProject, ProjectBundle } from "./types";

function databaseEnabled() {
  return hasDatabaseConfig();
}

function unknownToError(error: unknown) {
  return error instanceof Error ? error : new Error("Unknown error");
}

export async function listOrganizations(userId = demoUser.id) {
  if (!databaseEnabled()) {
    return demoOrganizations.filter((org) => org.ownerId === userId);
  }

  try {
    return await prisma.organization.findMany({
      where: {
        OR: [{ ownerId: userId }, { members: { some: { userId } } }],
      },
      orderBy: { createdAt: "asc" },
    });
  } catch {
    return demoOrganizations;
  }
}

export async function getOrganizationBySlug(slug: string) {
  if (!databaseEnabled()) {
    return demoOrganizations.find((org) => org.slug === slug) ?? null;
  }

  try {
    return await prisma.organization.findUnique({ where: { slug } });
  } catch {
    return demoOrganizations.find((org) => org.slug === slug) ?? null;
  }
}

export async function createOrganization(input: Omit<AppOrganization, "id" | "planId" | "ownerId"> & { ownerId?: string }) {
  if (!databaseEnabled()) {
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

  return prisma.organization.create({
    data: {
      name: input.name,
      slug: slugify(input.slug || input.name),
      brandColor: input.brandColor,
      logoUrl: input.logoUrl,
      customDomain: input.customDomain,
      supportEmail: input.supportEmail,
      footerMessage: input.footerMessage,
      ownerId: input.ownerId ?? demoUser.id,
    },
  });
}

export async function updateOrganization(slug: string, input: Partial<AppOrganization>) {
  if (!databaseEnabled()) {
    const organization = demoOrganizations.find((item) => item.slug === slug);
    if (!organization) {
      throw new ApiError(404, "organization_not_found", "Organization not found.");
    }
    Object.assign(organization, input);
    return organization;
  }

  return prisma.organization.update({
    where: { slug },
    data: {
      name: input.name,
      brandColor: input.brandColor,
      logoUrl: input.logoUrl,
      customDomain: input.customDomain,
      supportEmail: input.supportEmail,
      footerMessage: input.footerMessage,
    },
  });
}

export async function listClients(slug: string) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }

  if (!databaseEnabled()) {
    return demoClients.filter((item) => item.organizationId === organization.id);
  }

  return prisma.client.findMany({ where: { organizationId: organization.id }, orderBy: { createdAt: "desc" } });
}

export async function createClient(slug: string, input: Omit<AppClient, "id" | "organizationId" | "createdAt">) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }

  if (!databaseEnabled()) {
    const client: AppClient = {
      id: crypto.randomUUID(),
      organizationId: organization.id,
      createdAt: new Date().toISOString(),
      ...input,
    };
    demoClients.push(client);
    return client;
  }

  return prisma.client.create({ data: { ...input, organizationId: organization.id } });
}

export async function updateClient(slug: string, id: string, input: Partial<AppClient>) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }

  if (!databaseEnabled()) {
    const client = demoClients.find((item) => item.id === id && item.organizationId === organization.id);
    if (!client) {
      throw new ApiError(404, "client_not_found", "Client not found.");
    }
    Object.assign(client, input);
    return client;
  }

  return prisma.client.update({ where: { id }, data: input });
}

export async function listProjects(slug: string) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }

  if (!databaseEnabled()) {
    return demoProjects.filter((item) => item.organizationId === organization.id);
  }

  return prisma.project.findMany({ where: { organizationId: organization.id }, orderBy: { updatedAt: "desc" } });
}

export async function createProject(slug: string, input: Omit<AppProject, "id" | "organizationId" | "createdAt" | "updatedAt" | "accessToken">) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }

  if (!databaseEnabled()) {
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

  return prisma.project.create({
    data: {
      ...input,
      organizationId: organization.id,
      accessToken: crypto.randomUUID(),
      slug: slugify(input.slug || input.name),
    },
  });
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

export async function getPublicProjectBundle(orgSlug: string, projectSlug: string, token?: string): Promise<ProjectBundle> {
  if (!databaseEnabled()) {
    const bundle = getDemoProjectBundle(orgSlug, projectSlug);
    if (!bundle) {
      throw new ApiError(404, "project_not_found", "Project not found.");
    }
    if (bundle.project.visibility === "LINK_ONLY" && token !== bundle.project.accessToken) {
      throw new ApiError(403, "access_denied", "Project link token is invalid.");
    }
    return bundle;
  }

  try {
    const organization = await prisma.organization.findUnique({
      where: { slug: orgSlug },
      include: {
        projects: {
          where: { slug: projectSlug },
          include: {
            client: true,
            milestones: { orderBy: { order: "asc" } },
            updates: { orderBy: { createdAt: "desc" } },
            integrations: true,
            pageViews: true,
          },
        },
      },
    });

    const project = organization?.projects[0];
    if (!organization || !project) {
      throw new ApiError(404, "project_not_found", "Project not found.");
    }

    if (project.visibility === "LINK_ONLY" && token !== project.accessToken) {
      throw new ApiError(403, "access_denied", "Project link token is invalid.");
    }

    const countryCounts = new Map<string, number>();
    for (const pageView of project.pageViews) {
      if (pageView.country) {
        countryCounts.set(pageView.country, (countryCounts.get(pageView.country) ?? 0) + 1);
      }
    }

    return {
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        logoUrl: organization.logoUrl ?? undefined,
        brandColor: organization.brandColor,
        customDomain: organization.customDomain ?? undefined,
        planId: organization.planId as "free" | "pro" | "agency",
        ownerId: organization.ownerId,
        supportEmail: organization.supportEmail ?? undefined,
        footerMessage: organization.footerMessage ?? undefined,
      },
      client: project.client
        ? {
            id: project.client.id,
            organizationId: project.client.organizationId,
            name: project.client.name,
            email: project.client.email,
            company: project.client.company ?? undefined,
            avatarUrl: project.client.avatarUrl ?? undefined,
            createdAt: project.client.createdAt.toISOString(),
          }
        : undefined,
      project: {
        id: project.id,
        organizationId: project.organizationId,
        clientId: project.clientId ?? undefined,
        name: project.name,
        slug: project.slug,
        description: project.description ?? undefined,
        status: project.status,
        visibility: project.visibility,
        accessToken: project.accessToken,
        dueDate: project.dueDate?.toISOString(),
        startDate: project.startDate?.toISOString(),
        completedAt: project.completedAt?.toISOString(),
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
      },
      milestones: project.milestones.map((milestone) => ({
        id: milestone.id,
        projectId: milestone.projectId,
        title: milestone.title,
        description: milestone.description ?? undefined,
        status: milestone.status,
        dueDate: milestone.dueDate?.toISOString(),
        completedAt: milestone.completedAt?.toISOString(),
        order: milestone.order,
      })),
      updates: project.updates.map((update) => ({
        id: update.id,
        projectId: update.projectId,
        content: update.content,
        type: update.type,
        authorName: update.authorName ?? undefined,
        createdAt: update.createdAt.toISOString(),
        metadata: (update.metadata as Record<string, unknown> | null) ?? undefined,
      })),
      integrations: project.integrations.map((integration) => ({
        id: integration.id,
        projectId: integration.projectId,
        type: integration.type,
        isActive: integration.isActive,
        config: (integration.config as Record<string, unknown> | null) ?? {},
        lastSyncAt: integration.lastSyncAt?.toISOString(),
      })),
      analytics: {
        totalViews: project.pageViews.length,
        uniqueVisitors: Math.max(1, Math.floor(project.pageViews.length * 0.73)),
        topCountries: [...countryCounts.entries()].map(([country, views]) => ({ country, views })).slice(0, 5),
        dailyViews: project.pageViews.slice(0, 14).map((view: { viewedAt: Date }) => ({ date: view.viewedAt.toISOString(), views: 1 })),
      },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const fallback = getDemoProjectBundle(orgSlug, projectSlug);
    if (!fallback) {
      throw new ApiError(500, "repository_failed", unknownToError(error).message);
    }
    return fallback;
  }
}

export async function createProjectUpdate(projectId: string, content: string, authorName?: string) {
  if (!databaseEnabled()) {
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

  return prisma.projectUpdate.create({
    data: { projectId, content, authorName, type: "MANUAL" },
  });
}

export async function recordPageView(projectId: string, country?: string) {
  if (!databaseEnabled()) {
    demoPageViews.push({ id: crypto.randomUUID(), projectId, country, viewedAt: new Date().toISOString() });
    return { ok: true };
  }

  return prisma.pageView.create({ data: { projectId, country } });
}

export async function updateProject(slug: string, id: string, input: Partial<AppProject>) {
  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    throw new ApiError(404, "organization_not_found", "Organization not found.");
  }

  if (!databaseEnabled()) {
    const project = demoProjects.find((item) => item.id === id && item.organizationId === organization.id);
    if (!project) {
      throw new ApiError(404, "project_not_found", "Project not found.");
    }
    Object.assign(project, input, { updatedAt: new Date().toISOString() });
    return project;
  }

  return prisma.project.update({ where: { id }, data: input });
}

export async function createMilestone(projectId: string, input: Omit<AppMilestone, "id" | "projectId" | "order">) {
  if (!databaseEnabled()) {
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

  return prisma.milestone.create({
    data: {
      projectId,
      title: input.title,
      description: input.description,
      status: input.status,
      dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      completedAt: input.completedAt ? new Date(input.completedAt) : undefined,
      order: await prisma.milestone.count({ where: { projectId } }),
    },
  });
}

export async function updateMilestone(mid: string, input: Partial<AppMilestone>) {
  if (!databaseEnabled()) {
    const milestone = demoMilestones.find((item) => item.id === mid);
    if (!milestone) {
      throw new ApiError(404, "milestone_not_found", "Milestone not found.");
    }
    Object.assign(milestone, input);
    return milestone;
  }

  return prisma.milestone.update({
    where: { id: mid },
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
      dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      completedAt: input.completedAt ? new Date(input.completedAt) : undefined,
    },
  });
}

export async function reorderMilestones(projectId: string, milestoneIds: string[]) {
  if (!databaseEnabled()) {
    milestoneIds.forEach((milestoneId, index) => {
      const milestone = demoMilestones.find((item) => item.id === milestoneId && item.projectId === projectId);
      if (milestone) {
        milestone.order = index;
      }
    });
    return demoMilestones.filter((item) => item.projectId === projectId).sort((a, b) => a.order - b.order);
  }

  await Promise.all(
    milestoneIds.map((id, index) =>
      prisma.milestone.update({
        where: { id },
        data: { order: index },
      }),
    ),
  );
  return prisma.milestone.findMany({ where: { projectId }, orderBy: { order: "asc" } });
}

export async function deleteById(type: "client" | "project" | "milestone" | "update" | "integration", id: string) {
  if (!databaseEnabled()) {
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

  switch (type) {
    case "client":
      return prisma.client.delete({ where: { id } });
    case "project":
      return prisma.project.delete({ where: { id } });
    case "milestone":
      return prisma.milestone.delete({ where: { id } });
    case "update":
      return prisma.projectUpdate.delete({ where: { id } });
    case "integration":
      return prisma.projectIntegration.delete({ where: { id } });
    default:
      throw new ApiError(400, "unsupported_delete", "Unsupported delete target.");
  }
}

export async function connectIntegration(projectId: string, input: Omit<AppIntegration, "id" | "projectId" | "isActive">) {
  if (!databaseEnabled()) {
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

  return prisma.projectIntegration.create({
    data: {
      projectId,
      type: input.type,
      config: input.config as Prisma.InputJsonValue,
      isActive: true,
      lastSyncAt: new Date(),
    },
  });
}

export function billingPlans() {
  return [
    { id: "free", name: "Free", priceMonthly: 0, features: ["1 project", "1 client", "Public status page"] },
    { id: "pro", name: "Pro", priceMonthly: 12, features: ["Unlimited projects", "Unlimited clients", "Custom domain"] },
    { id: "agency", name: "Agency", priceMonthly: 39, features: ["Unlimited everything", "Team members", "Priority support"] },
  ];
}
