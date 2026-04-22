import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { deleteById, updateMilestone } from "@/lib/repository";
import { milestoneSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ mid: string }> }) {
  return withApiHandler(request, async () => {
    const { mid } = await params;
    const data = await parseJson(request, milestoneSchema.partial());
    return ok({ milestone: await updateMilestone(mid, data) });
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ mid: string }> }) {
  return withApiHandler(request, async () => {
    const { mid } = await params;
    await deleteById("milestone", mid);
    return ok({ deleted: true });
  });
}
