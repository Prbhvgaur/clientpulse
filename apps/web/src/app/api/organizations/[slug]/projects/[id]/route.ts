import { ApiError, withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { deleteById, getProjectBundleById, updateProject } from "@/lib/repository";
import { projectSchema } from "@/lib/validation";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  return withApiHandler(request, async () => {
    const { slug, id } = await params;
    const project = await getProjectBundleById(slug, id);
    if (!project) {
      throw new ApiError(404, "project_not_found", "Project not found.");
    }
    return ok({ project });
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  return withApiHandler(request, async () => {
    const { slug, id } = await params;
    const data = await parseJson(request, projectSchema.partial());
    return ok({ project: await updateProject(slug, id, data) });
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withApiHandler(request, async () => {
    const { id } = await params;
    await deleteById("project", id);
    return ok({ deleted: true });
  });
}
