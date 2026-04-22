import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { createProject, listProjects } from "@/lib/repository";
import { projectSchema } from "@/lib/validation";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    return ok({ projects: await listProjects(slug) });
  });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    const data = await parseJson(request, projectSchema);
    const project = await createProject(slug, {
      ...data,
      status: data.status ?? "IN_PROGRESS",
      visibility: data.visibility ?? "LINK_ONLY",
    });
    return ok({ project }, { status: 201 });
  });
}
