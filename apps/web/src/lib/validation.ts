import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(2).max(80),
  slug: z.string().min(2).max(60).regex(/^[a-z0-9-]+$/),
  brandColor: z.string().regex(/^#([0-9a-fA-F]{6})$/),
  logoUrl: z.string().url().optional(),
  customDomain: z.string().optional(),
  supportEmail: z.string().email().optional(),
  footerMessage: z.string().max(160).optional(),
});

export const clientSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().max(80).optional(),
  avatarUrl: z.string().url().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "IN_REVIEW", "COMPLETED", "ON_HOLD", "CANCELLED"]).optional(),
  visibility: z.enum(["PRIVATE", "LINK_ONLY", "PUBLIC"]).optional(),
  dueDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  clientId: z.string().optional(),
});

export const milestoneSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(1000).optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "BLOCKED"]).optional(),
  dueDate: z.string().datetime().optional(),
});

export const reorderSchema = z.object({
  milestoneIds: z.array(z.string()).min(1),
});

export const updateSchema = z.object({
  content: z.string().min(2).max(4000),
  authorName: z.string().max(80).optional(),
});

export const integrationSchema = z.object({
  type: z.enum(["GITHUB", "LINEAR", "TRELLO", "JIRA", "NOTION"]),
  config: z.record(z.string(), z.unknown()).default({}),
});

export const publicAccessSchema = z.object({
  token: z.string().optional(),
});

export const checkoutSchema = z.object({
  planId: z.enum(["pro", "agency"]),
  organizationSlug: z.string().min(2),
});
