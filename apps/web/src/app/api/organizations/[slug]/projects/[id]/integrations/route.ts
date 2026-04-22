import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { connectIntegration } from "@/lib/repository";
import { integrationSchema } from "@/lib/validation";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withApiHandler(request, async () => {
    const { id } = await params;
    const data = await parseJson(request, integrationSchema);
    return ok({ integration: await connectIntegration(id, data) }, { status: 201 });
  });
}
