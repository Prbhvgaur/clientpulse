import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { createProjectUpdate } from "@/lib/repository";
import { updateSchema } from "@/lib/validation";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withApiHandler(request, async () => {
    const { id } = await params;
    const data = await parseJson(request, updateSchema);
    return ok({ update: await createProjectUpdate(id, data.content, data.authorName) }, { status: 201 });
  });
}
