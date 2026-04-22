import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";
import { getPublicProjectBundle, recordPageView } from "@/lib/repository";

export async function POST(request: Request, { params }: { params: Promise<{ orgSlug: string; projectSlug: string }> }) {
  return withApiHandler(request, async () => {
    const { orgSlug, projectSlug } = await params;
    const bundle = await getPublicProjectBundle(orgSlug, projectSlug);
    const country = request.headers.get("x-vercel-ip-country") ?? undefined;
    await recordPageView(bundle.project.id, country);
    return ok({ recorded: true });
  });
}
