export type MemberRole = "OWNER" | "ADMIN" | "MEMBER";
export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "IN_REVIEW" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
export type Visibility = "PRIVATE" | "LINK_ONLY" | "PUBLIC";
export type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
export type UpdateType =
  | "MANUAL"
  | "MILESTONE_COMPLETED"
  | "STATUS_CHANGED"
  | "GITHUB_COMMIT"
  | "GITHUB_PR_MERGED"
  | "LINEAR_ISSUE_CLOSED"
  | "TRELLO_CARD_MOVED";
export type IntegrationType = "GITHUB" | "LINEAR" | "TRELLO" | "JIRA" | "NOTION";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface AppOrganization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  brandColor: string;
  customDomain?: string;
  planId: "free" | "pro" | "agency";
  ownerId: string;
  supportEmail?: string;
  footerMessage?: string;
}

export interface AppMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: MemberRole;
}

export interface AppClient {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  company?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AppProject {
  id: string;
  organizationId: string;
  clientId?: string;
  name: string;
  slug: string;
  description?: string;
  status: ProjectStatus;
  visibility: Visibility;
  accessToken: string;
  dueDate?: string;
  startDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppMilestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: MilestoneStatus;
  dueDate?: string;
  completedAt?: string;
  order: number;
}

export interface AppProjectUpdate {
  id: string;
  projectId: string;
  content: string;
  type: UpdateType;
  authorName?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface AppIntegration {
  id: string;
  projectId: string;
  type: IntegrationType;
  isActive: boolean;
  config: Record<string, unknown>;
  lastSyncAt?: string;
}

export interface AppPageView {
  id: string;
  projectId: string;
  country?: string;
  viewedAt: string;
}

export interface ProjectBundle {
  organization: AppOrganization;
  client?: AppClient;
  project: AppProject;
  milestones: AppMilestone[];
  updates: AppProjectUpdate[];
  integrations: AppIntegration[];
  analytics: {
    totalViews: number;
    uniqueVisitors: number;
    topCountries: Array<{ country: string; views: number }>;
    dailyViews: Array<{ date: string; views: number }>;
  };
}
