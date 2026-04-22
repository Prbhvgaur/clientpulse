import { withApiHandler } from "@/lib/errors";
import { ok, parseJson } from "@/lib/http";
import { checkoutSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return withApiHandler(request, async () => {
    const data = await parseJson(request, checkoutSchema);
    return ok({
      checkoutUrl: `https://checkout.stripe.com/pay/mock-session?plan=${data.planId}&org=${data.organizationSlug}`,
    });
  });
}
