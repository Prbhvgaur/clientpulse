import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";
import { deleteById } from "@/lib/repository";

export async function DELETE(request: Request, { params }: { params: Promise<{ iid: string }> }) {
  return withApiHandler(request, async () => {
    const { iid } = await params;
    await deleteById("integration", iid);
    return ok({ deleted: true });
  });
}
