import { describe, expect, it } from "vitest";

import { GET as getPublicProject } from "./public/[orgSlug]/[projectSlug]/route";

describe("public project route", () => {
  it("returns project data with cache headers", async () => {
    const response = await getPublicProject(new Request("https://clientpulse.app/api/public/northstar-studio/clientpulse-launch"), {
      params: Promise.resolve({ orgSlug: "northstar-studio", projectSlug: "clientpulse-launch" }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=60");
  });
});
