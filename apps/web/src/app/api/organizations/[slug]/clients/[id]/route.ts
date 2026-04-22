import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { deleteById, updateClient } from "@/lib/repository";
import { clientSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  return withApiHandler(request, async () => {
    const { slug, id } = await params;
    const data = await parseJson(request, clientSchema.partial());
    return ok({ client: await updateClient(slug, id, data) });
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withApiHandler(request, async () => {
    const { id } = await params;
    await deleteById("client", id);
    return ok({ deleted: true });
  });
}
