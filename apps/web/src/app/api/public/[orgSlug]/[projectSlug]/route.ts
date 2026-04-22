import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";
import { getPublicProjectBundle } from "@/lib/repository";

export async function GET(request: Request, { params }: { params: Promise<{ orgSlug: string; projectSlug: string }> }) {
  return withApiHandler(request, async () => {
    const { orgSlug, projectSlug } = await params;
    const { searchParams } = new URL(request.url);
    const bundle = await getPublicProjectBundle(orgSlug, projectSlug, searchParams.get("token") ?? undefined);
    return ok(bundle, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  });
}
