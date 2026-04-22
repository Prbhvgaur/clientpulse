import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { createClient, listClients } from "@/lib/repository";
import { clientSchema } from "@/lib/validation";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    return ok({ clients: await listClients(slug) });
  });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return withApiHandler(request, async () => {
    const { slug } = await params;
    const data = await parseJson(request, clientSchema);
    const client = await createClient(slug, data);
    return ok({ client }, { status: 201 });
  });
}
