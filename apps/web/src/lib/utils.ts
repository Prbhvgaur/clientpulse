import { type ClassValue, clsx } from "clsx";
import { differenceInCalendarDays, format, formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

import type { MilestoneStatus, ProjectStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatDate(date?: string) {
  return date ? format(new Date(date), "MMM d, yyyy") : "TBD";
}

export function formatRelative(date?: string) {
  return date ? `${formatDistanceToNowStrict(new Date(date), { addSuffix: true })}` : "Not yet";
}

export function percentElapsed(startDate?: string, dueDate?: string) {
  if (!startDate || !dueDate) {
    return 0;
  }

  const start = new Date(startDate);
  const due = new Date(dueDate);
  const total = Math.max(1, differenceInCalendarDays(due, start));
  const elapsed = Math.min(total, Math.max(0, differenceInCalendarDays(new Date(), start)));
  return Math.round((elapsed / total) * 100);
}

export function projectStatusMeta(status: ProjectStatus) {
  switch (status) {
    case "PLANNING":
      return { label: "Planning", className: "bg-slate-200 text-slate-700" };
    case "IN_PROGRESS":
      return { label: "In Progress", className: "bg-sky-100 text-sky-700" };
    case "IN_REVIEW":
      return { label: "In Review", className: "bg-amber-100 text-amber-700" };
    case "COMPLETED":
      return { label: "Completed", className: "bg-emerald-100 text-emerald-700" };
    case "ON_HOLD":
      return { label: "On Hold", className: "bg-orange-100 text-orange-700" };
    case "CANCELLED":
      return { label: "Cancelled", className: "bg-rose-100 text-rose-700" };
  }
}

export function milestoneStatusMeta(status: MilestoneStatus) {
  switch (status) {
    case "PENDING":
      return { label: "Pending", className: "bg-slate-100 text-slate-700" };
    case "IN_PROGRESS":
      return { label: "In Progress", className: "bg-sky-100 text-sky-700" };
    case "COMPLETED":
      return { label: "Completed", className: "bg-emerald-100 text-emerald-700" };
    case "BLOCKED":
      return { label: "Blocked", className: "bg-rose-100 text-rose-700" };
  }
}

export function assertNever(value: never): never {
  void value;
  throw new Error("Unexpected value");
}
