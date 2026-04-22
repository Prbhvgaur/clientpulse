import { withApiHandler } from "@/lib/errors";
import { ok } from "@/lib/http";

export async function POST(request: Request) {
  return withApiHandler(request, async () =>
    ok({
      uploaded: true,
      url: "https://dummyimage.com/256x256/0f766e/ffffff.png&text=Logo",
    }),
  );
}
