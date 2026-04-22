import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublicProjectPage } from "@/components/public-project-page";
import { getPublicProjectBundle } from "@/lib/repository";
import { formatRelative } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orgSlug: string; projectSlug: string }>;
}): Promise<Metadata> {
  const { orgSlug, projectSlug } = await params;

  try {
    const bundle = await getPublicProjectBundle(orgSlug, projectSlug);
    return {
      title: `${bundle.project.name} status`,
      description: bundle.project.description,
      openGraph: {
        title: `${bundle.project.name} • ${bundle.organization.name}`,
        description: `${bundle.project.description ?? "Live project updates"} · ${formatRelative(bundle.project.updatedAt)}`,
        images: bundle.organization.logoUrl ? [{ url: bundle.organization.logoUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Project status",
    };
  }
}

export default async function PublicProjectStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ orgSlug: string; projectSlug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { orgSlug, projectSlug } = await params;
  const { token } = await searchParams;
  let bundle = null;

  try {
    bundle = await getPublicProjectBundle(orgSlug, projectSlug, token);
  } catch {
    notFound();
  }

  return <PublicProjectPage bundle={bundle} />;
}
