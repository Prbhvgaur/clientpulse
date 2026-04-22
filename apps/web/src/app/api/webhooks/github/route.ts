import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";

export async function POST(request: Request) {
  return withApiHandler(request, async () => ok({ received: true, provider: "github" }));
}
