import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";

export async function GET(request: Request) {
  return withApiHandler(request, async () =>
    ok({
      portalUrl: "https://billing.stripe.com/p/login/mock-portal",
    }),
  );
}
