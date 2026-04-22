import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { createOrganization, listOrganizations } from "@/lib/repository";
import { organizationSchema } from "@/lib/validation";

export async function GET(request: Request) {
  return withApiHandler(request, async () => ok({ organizations: await listOrganizations() }));
}

export async function POST(request: Request) {
  return withApiHandler(request, async () => {
    const data = await parseJson(request, organizationSchema);
    const organization = await createOrganization(data);
    return ok({ organization }, { status: 201 });
  });
}
