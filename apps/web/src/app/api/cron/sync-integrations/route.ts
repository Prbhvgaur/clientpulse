import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";

export async function GET(request: Request) {
  return withApiHandler(request, async () =>
    ok({
      synced: true,
      providers: ["github", "linear", "trello", "jira"],
      ranAt: new Date().toISOString(),
    }),
  );
}
