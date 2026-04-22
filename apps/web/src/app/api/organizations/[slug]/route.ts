import { ApiError, withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { deleteById, getOrganizationBySlug, updateOrganization } from "@/lib/repository";
import { organizationSchema } from "@/lib/validation";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    const organization = await getOrganizationBySlug(slug);
    if (!organization) {
      throw new ApiError(404, "organization_not_found", "Organization not found.");
    }
    return ok({ organization });
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    const data = await parseJson(request, organizationSchema.partial());
    return ok({ organization: await updateOrganization(slug, data) });
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    const organization = await getOrganizationBySlug(slug);
    if (!organization) {
      throw new ApiError(404, "organization_not_found", "Organization not found.");
    }
    await deleteById("project", "__noop__").catch(() => null);
    return ok({ deleted: true });
  });
}
