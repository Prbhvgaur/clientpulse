import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { reorderMilestones } from "@/lib/repository";
import { reorderSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withApiHandler(request, async () => {
    const { id } = await params;
    const data = await parseJson(request, reorderSchema);
    return ok({ milestones: await reorderMilestones(id, data.milestoneIds) });
  });
}
