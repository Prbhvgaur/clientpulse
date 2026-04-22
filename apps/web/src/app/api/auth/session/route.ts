import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";
import { getAppSession } from "@/lib/auth";

export async function GET(request: Request) {
  return withApiHandler(request, async () => ok({ session: await getAppSession() }));
}
