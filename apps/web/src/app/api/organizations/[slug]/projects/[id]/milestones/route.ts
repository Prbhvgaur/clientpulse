import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { createMilestone } from "@/lib/repository";
import { milestoneSchema } from "@/lib/validation";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withApiHandler(request, async () => {
    const { id } = await params;
    const data = await parseJson(request, milestoneSchema);
    const milestone = await createMilestone(id, {
      title: data.title,
      description: data.description,
      status: data.status ?? "PENDING",
      dueDate: data.dueDate,
      completedAt: data.status === "COMPLETED" ? new Date().toISOString() : undefined,
    });
    return ok({ milestone }, { status: 201 });
  });
}
