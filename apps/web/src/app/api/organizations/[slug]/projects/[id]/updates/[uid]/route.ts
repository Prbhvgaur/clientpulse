import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";
import { deleteById } from "@/lib/repository";

export async function DELETE(request: Request, { params }: { params: Promise<{ uid: string }> }) {
  return withApiHandler(request, async () => {
    const { uid } = await params;
    await deleteById("update", uid);
    return ok({ deleted: true });
  });
}
