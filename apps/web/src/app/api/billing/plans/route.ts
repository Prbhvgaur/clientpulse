import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";
import { billingPlans } from "@/lib/repository";

export async function GET(request: Request) {
  return withApiHandler(request, async () => ok({ plans: billingPlans() }));
}
